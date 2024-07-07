import StoriesCard from "~/components/story/stories-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getActiveProject, getUserFromToken } from "~/lib/actions";

export default async function HomePage() {
  const user = await getUserFromToken();
  const activeProject = await getActiveProject();

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
          </TabsList>
        </div>
        <TabsContent value="stories">
          <StoriesCard />
        </TabsContent>
        <TabsContent value="tasks">
          <div>tasks</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
