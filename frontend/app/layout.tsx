import "./globals.css";
import { Raleway, Inter, Syne } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Armatrix — Team Directory",
  description:
    "Meet the team redefining access in critical infrastructure through hyper-redundant robotics.",
  keywords: ["armatrix", "robotics", "team", "engineering", "deep-tech"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${inter.variable} ${syne.variable}`}
    >
      <body className="min-h-screen custom-scrollbar">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
