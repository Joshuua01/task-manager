import { getActiveProject, getStoriesByProjectId } from "~/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DataTable from "./data-table";
import { columns } from "./columns";
import AddStoryButton from "./add-story-button";

export default async function StoriesCard() {
  const activeProject = await getActiveProject();
  if (!activeProject) return null;
  const stories = await getStoriesByProjectId(activeProject?.id);
  return (
    <Card className="mt-6 border border-border py-6">
      <CardContent>
        <DataTable columns={columns} data={stories} />
      </CardContent>
    </Card>
  );
}
