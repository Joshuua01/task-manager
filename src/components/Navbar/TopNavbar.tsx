import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getUserFromToken } from "~/lib/auth";
import { getProjects } from "~/server/db";
import { ThemeToggle } from "../ThemeToggle";
import ProjectSelect from "./ProjectSelect";
import { type Project } from "~/app/models";
import ProfileDropdown from "./ProfileDropdown";

export default async function TopNavbar() {
  const projects: Project[] = await getProjects();
  const user = await getUserFromToken();

  return (
    <nav className="flex items-center justify-between border-b border-border/40 bg-background p-5 text-primary">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-bold">
          Task-Manager
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        {user ? (
          <>
            <ProjectSelect projects={projects} />
            <ProfileDropdown user={user} />
          </>
        ) : (
          <Button variant="outline">
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
