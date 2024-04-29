import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getActiveProject, getProjects, getUserFromToken } from "~/lib/actions";
import { ThemeToggle } from "../ThemeToggle";
import ProjectSelect from "./ProjectSelect";
import { type Project } from "~/app/models";
import ProfileDropdown from "./ProfileDropdown";
import AddProjectButton from "./AddProjectButton";
import RemoveProjectButton from "./RemoveProjectButton";

export default async function TopNavbar() {
  const projects: Project[] = await getProjects();
  const user = await getUserFromToken();
  const activeProject = await getActiveProject();

  return (
    <nav className="flex items-center justify-between border-b border-border bg-background p-5 text-primary">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-bold">
          Task-Manager
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        {user ? (
          <>
            <div className="flex items-center gap-3">
              <ProjectSelect
                projects={projects}
                value={
                  activeProject?.id.toString()
                    ? activeProject?.id.toString()
                    : ""
                }
              />
              <AddProjectButton />
              <RemoveProjectButton />
            </div>
            <ProfileDropdown user={user} />
          </>
        ) : (
          <Button>
            <Link href="/auth/login">Sign in</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
