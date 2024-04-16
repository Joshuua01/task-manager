import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getProjects } from "~/server/db";

const selectProjects = async () => {
  "use server";
  const projects = await getProjects();
  return projects;
};

export default async function TopNavbar() {
  const projects = await selectProjects();

  return (
    <nav className="flex items-center justify-between border-b bg-secondary p-5 text-primary">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-3xl font-bold">
          Task Manager
        </Link>
        {/* Select shows up only on logged in users */}
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem
                key={project.id}
                value={project.id as unknown as string}
              >
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="outline">Sign in</Button>
        <Button variant="default">Sign up</Button>
      </div>
    </nav>
  );
}
