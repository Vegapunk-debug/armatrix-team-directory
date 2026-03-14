export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
}

export type TeamMemberPayload = Omit<TeamMember, "id">;

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";


export async function fetchTeam(): Promise<TeamMember[]> {
  const res = await fetch(`${baseUrl}/api/team`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch team")
  }
  return res.json()
}

export async function createMember(payload: Omit<TeamMember, "id">): Promise<TeamMember> {
  const res = await fetch(`${baseUrl}/api/team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error("Failed to create member")
  }
  return res.json()
}
