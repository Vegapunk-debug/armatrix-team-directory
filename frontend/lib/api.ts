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

