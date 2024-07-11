import Link from "next/link";
import TaskPageHeader from "~/components/tasks/task-page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import {
  getProjectById,
  getStoryById,
  getTaskById,
  getUserById,
  getUsers,
} from "~/lib/actions";
import { capitalizeFirstLetter } from "~/lib/utils";

export default async function TaskPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const users = (await getUsers()).filter((user) => user.role !== "admin");
  const task = await getTaskById(id);
  if (!task) return null;
  const story = await getStoryById(task.storyId);
  if (!story) return null;
  const project = await getProjectById(story.projectId);
  if (!project) return null;
  const owner = await getUserById(task.ownerId);
  const assignee = task.assigneeId ? await getUserById(task.assigneeId) : null;

  return (
    <>
      <TaskPageHeader
        story={story}
        project={project}
        task={task}
        users={users}
      />
      <div className="grid h-full grid-cols-3 px-10">
        <div className="col-span-2 p-5">
          <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent>{task.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Details
              </AccordionTrigger>
              <AccordionContent>
                <Table className="w-[350px]">
                  <TableBody>
                    <TableRow className="border-none">
                      <TableCell className="w-[150px] font-semibold">
                        Type
                      </TableCell>
                      <TableCell>Task</TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Priority</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(task.priority)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Status</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(task.status)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">
                        Estimated time
                      </TableCell>
                      <TableCell>{task.expectedTime} days</TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">
                        Related story
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/story/${story.id}`}
                          className="transition-all duration-200 ease-in-out hover:underline"
                        >
                          {story.name}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-1 p-5">
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold">
                People
              </AccordionTrigger>
              <AccordionContent>
                <Table className="w-[250px]">
                  <TableBody>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Owner</TableCell>
                      <TableCell>
                        {`${owner?.name} ${owner?.surname}`}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Assignee</TableCell>
                      <TableCell>
                        {assignee
                          ? `${assignee?.name} ${assignee?.surname}`
                          : "Not assigned yet"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Dates
              </AccordionTrigger>
              <AccordionContent>
                <Table className="w-[250px]">
                  <TableBody>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">
                        Created on
                      </TableCell>
                      <TableCell>
                        {task.creationDate.toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">
                        Started on
                      </TableCell>
                      <TableCell>
                        {task.startDate
                          ? task.startDate.toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Not started yet"}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">
                        Finished on
                      </TableCell>
                      <TableCell>
                        {task.endDate
                          ? task.endDate.toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Not finished yet"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
