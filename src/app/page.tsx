import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getActiveProject, getUserFromToken } from "~/lib/actions";

export default async function HomePage() {
  const user = await getUserFromToken();
  const activeProject = await getActiveProject();

  return (
    <div className="flex h-full w-full flex-col bg-background p-10">
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
          <div>stories</div>
        </TabsContent>
        <TabsContent value="tasks">
          <div>tasks</div>
        </TabsContent>
        <TabsContent value="kanban">
          <div>kanban</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
