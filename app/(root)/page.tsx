import Image from "next/image";
import Link from "next/link";

import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex max-w-lg flex-col gap-6">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="mt-8 flex flex-col gap-6">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            <>
              {userInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </>
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-6">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            <>
              {allInterview?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </>
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
