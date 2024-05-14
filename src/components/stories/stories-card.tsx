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

export default async function StoriesCard() {
  const activeProject = await getActiveProject();
  if (!activeProject) return null;
  const stories = await getStoriesByProjectId(activeProject?.id);
  return (
    <Card className="mt-6 border border-border">
      <CardHeader>
        <CardTitle> Stories </CardTitle>
        <CardDescription> Here you can see stories.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={stories} />
      </CardContent>
    </Card>
  );
}
