import { getActiveProject } from "~/lib/actions";
import ProjectEditButton from "./ProjectEditButton";

export default async function ProjectHeader() {
  const currentProject = await getActiveProject();

  return (
    <div className="flex flex-row items-center justify-between border-b border-border p-4">
      <h1 className="text-xl font-semibold">{currentProject?.name}</h1>
      <ProjectEditButton />
    </div>
  );
}
