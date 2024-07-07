import StoryPageHeader from "~/components/story/story-page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { getProjectById, getStoryById, getUserById } from "~/lib/actions";
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
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent>{story.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold">
                Tasks
              </AccordionTrigger>
              <AccordionContent>{story.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div></div>
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
