import "~/styles/globals.css";

import { Inter } from "next/font/google";
import TopNavbar from "./_components/TopNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Task Manager",
  description: "Task Manager made by Jan Steinbichler",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="grid h-screen grid-rows-[auto_1fr]">
          <TopNavbar />
          <div className="flex h-full flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
