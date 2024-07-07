import Link from "next/link";
import StoryPageHeader from "~/components/story/story-page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  getProjectById,
  getStoryById,
  getTasksByStoryId,
  getUserById,
} from "~/lib/actions";
import { capitalizeFirstLetter } from "~/lib/utils";

export default async function StoryPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const story = await getStoryById(id);
  if (!story) return null;
  const project = await getProjectById(story.projectId);
  if (!project) return null;
  const owner = await getUserById(story.ownerId);
  const tasks = await getTasksByStoryId(story.id);

  return (
    <>
      <StoryPageHeader story={story} project={project} />
      <div className="grid h-full grid-cols-3 px-10 py-5">
        <div className="col-span-2 p-5">
          <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent>{story.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Details
              </AccordionTrigger>
              <AccordionContent>
                <Table className="w-[200px]">
                  <TableBody>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Type</TableCell>
                      <TableCell>Story</TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Priority</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(story.priority)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-semibold">Status</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(story.status)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="text-xl font-semibold">
                Tasks
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableCell className="font-semibold">Id</TableCell>
                          <TableCell className="font-semibold">Name</TableCell>
                          <TableCell className="font-semibold">
                            Status
                          </TableCell>
                          <TableCell className="font-semibold">
                            Priority
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-semibold">
                              {task.id}
                            </TableCell>
                            <TableCell>
                              <Link href={`/task/${task.id}`}>{task.name}</Link>
                            </TableCell>
                            <TableCell>
                              {capitalizeFirstLetter(task.status)}
                            </TableCell>
                            <TableCell>
                              {capitalizeFirstLetter(task.priority)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
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
                      <TableCell className="font-semibold">Created</TableCell>
                      <TableCell>
                        {story.creationDate.toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
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
