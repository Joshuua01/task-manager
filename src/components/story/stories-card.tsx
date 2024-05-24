import { getActiveProject, getStoriesByProjectId } from "~/lib/actions";
import { Card, CardContent } from "../ui/card";
import DataTable from "./data-table";
import { columns } from "./columns";

export default async function StoriesCard() {
  const activeProject = await getActiveProject();
  if (!activeProject) return null;
  const stories = await getStoriesByProjectId(activeProject?.id);
  return (
    <Card className="mt-6 border border-border p-6">
      <CardContent className="p-0">
        <DataTable columns={columns} data={stories} />
      </CardContent>
    </Card>
  );
}
