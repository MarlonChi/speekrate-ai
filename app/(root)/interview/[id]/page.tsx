import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/agent";
import DisplayTechIcons from "@/components/display-tech-icons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/utils";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="max-sm: flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="size-[40px] rounded-full object-cover"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>

            <DisplayTechIcons techStack={interview.techstack} />
          </div>
        </div>

        <p className="bg-dark-200 h-fit rounded-lg px-4 py-2 capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        type="interview"
        interviewId={id}
        questions={interview.questions}
      />
    </>
  );
};

export default Page;
