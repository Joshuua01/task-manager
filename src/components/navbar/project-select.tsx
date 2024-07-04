"use client";

import { type Project } from "~/models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { saveCookie } from "~/lib/actions";

export default function ProjectSelect({
  projects,
  value,
}: {
  projects: Project[];
  value: string;
}) {
  const handleProjectChange = async (projectId: string) => {
    await saveCookie("activeProject", projectId);
  };

  return (
    <Select onValueChange={handleProjectChange} value={value}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
