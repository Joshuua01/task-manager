import { getActiveProject } from "~/lib/actions";
import ProjectEditButton from "./ProjectEditButton";

export default async function ProjectHeader() {
  const currentProject = await getActiveProject();

  return (
    <div className="flex flex-row items-center justify-between border-b border-border px-10 py-4">
      <h1 className="text-xl font-semibold">{currentProject?.name}</h1>
      <ProjectEditButton currentProject={currentProject} />
    </div>
  );
}
