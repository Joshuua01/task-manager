import { useState } from "react";
import StoryPageHeader from "~/components/story/story-page-header";
import { getProjectById, getStoryById } from "~/lib/actions";

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

  return (
    <>
      <StoryPageHeader story={story} project={project} />
      <div className="grid h-full grid-cols-3">
        <div className="col-span-2 p-5">
          <div>
            <h2 className="text-2xl font-semibold">{story.name}</h2>
          </div>
        </div>
        <div className="col-span-1 p-5">x</div>
      </div>
    </>
  );
}
