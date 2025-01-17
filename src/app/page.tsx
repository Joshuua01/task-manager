import Kanban from "~/components/kanban/kanban";
import StoriesCard from "~/components/story/stories-card";
import TasksCard from "~/components/tasks/tasks-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getActiveProject, getUserFromToken } from "~/lib/actions";
import { getTasksByProjectId } from "~/server/db";

export default async function HomePage() {
  const user = await getUserFromToken();
  const activeProject = await getActiveProject();
  if (!activeProject)
    return (
      <div className="flex h-full items-center justify-center text-3xl font-semibold">
        Please select a project to continue.
      </div>
    );
  const tasks = await getTasksByProjectId(activeProject.id);

  return (
    <div className="flex h-full w-full flex-col bg-background px-10 py-5">
      <Tabs defaultValue="stories">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back {user?.name}!</h1>
            <h2 className="text-md text-primary/50">
              Here is the work for{" "}
              <span className="italic">{activeProject?.name}</span> project.
            </h2>
          </div>
          <TabsList>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="tasks">Assigned Tasks</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="stories">
          <StoriesCard />
        </TabsContent>
        <TabsContent value="tasks">
          <TasksCard />
        </TabsContent>
        <TabsContent value="kanban">
          <Kanban tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
