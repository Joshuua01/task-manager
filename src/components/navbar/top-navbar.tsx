import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getActiveProject, getProjects, getUserFromToken } from "~/lib/actions";
import { ThemeToggle } from "../ThemeToggle";
import ProjectSelect from "./project-select";
import { type Project } from "~/models";
import ProfileDropdown from "./profile-dropdown";
import AddProjectButton from "./add-project-button";
import RemoveProjectButton from "./remove-project-button";
import ProjectEditButton from "../project/project-edit-button";
import { Separator } from "../ui/separator";

export default async function TopNavbar() {
  const projects: Project[] = await getProjects();
  const user = await getUserFromToken();
  const activeProject = await getActiveProject();

  return (
    <nav className="flex items-center justify-between border-b border-border bg-background p-5 text-primary">
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="text-3xl font-bold uppercase tracking-wide first-letter:text-4xl"
        >
          Task-Manager
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-12" />
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
              <ProjectEditButton currentProject={activeProject} />
              <RemoveProjectButton />
              <Separator orientation="vertical" className="h-12" />
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
