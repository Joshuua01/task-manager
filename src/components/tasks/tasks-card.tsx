import { getTasksByUserId, getUserFromToken } from "~/lib/actions";
import DataTable from "../story/data-table";
import { Card, CardContent } from "../ui/card";
import { columns } from "./columns";

export default async function TasksCard() {
  const activeUser = await getUserFromToken();
  if (!activeUser) return null;
  const userTasks = await getTasksByUserId(activeUser.id);
  if (!userTasks) return null;
  return (
    <Card className="mt-6 border border-border p-6">
      <CardContent className="p-0">
        <DataTable columns={columns} data={userTasks} />
      </CardContent>
    </Card>
  );
}
