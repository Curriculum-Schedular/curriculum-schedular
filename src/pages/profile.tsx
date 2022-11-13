import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import CourseCard from '@elements/course-card';

import { useElectiveStore } from '@utils/store';
import {
  getRelevantCoursesGivenEdgeList,
  getEdgeListFromElective,
} from '@utils/findElectives';

const ProfilePage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const chosenElective = useElectiveStore((state) => state.chosenElective);
  const edgeList = getEdgeListFromElective(chosenElective);
  const courses = getRelevantCoursesGivenEdgeList(edgeList);
  console.log('courses in profile: ', courses);

  if (status !== 'authenticated') {
    return (
      <div>
        <p>
          you are not signed in.
          <button onClick={() => signIn()}>Sign In</button>
        </p>
      </div>
    );
  }

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3 items-center justify-center">
          <Image
            src={session?.user?.image ?? ''}
            alt=""
            style={{ borderRadius: '100%' }}
            height={150}
            width={150}
          />
          <h2 className="text-2xl">
            Welcome <span className="font-bold">{session?.user?.name}</span>
          </h2>
          <div className="text-lg flex gap-2">
            <div className="flex flex-col gap-2 font-semibold">
              <p>Name: </p>
              <p>User Name: </p>
              <p>Email: </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <p>{session?.user?.name}</p>
              <p>MuheshKumar</p>
              <p>{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* TODO: Separate it out as a component later */}
        {/* Electives Taken */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-3xl">Electives Taken</h2>
          <div className="flex gap-5 flex-wrap justify-center">
            {courses.map((course: string) => {
              return (
                <CourseCard
                  key={course}
                  courseName={course}
                  weeksToGo={(Math.ceil(Math.random() * 34) % 34) + 1}
                  hoursToGo={(Math.ceil(Math.random() * 200) % 200) + 1}
                  percentageCompleted={Math.ceil(Math.random() * 101) % 101}
                />
              );
            })}
            {/* <CourseCard
              courseName="Machine Learning"
              weeksToGo={12}
              hoursToGo={150}
              percentageCompleted={46}
            />
            <CourseCard
              courseName="Statistics"
              weeksToGo={5}
              hoursToGo={24}
              percentageCompleted={86}
            />
            <CourseCard
              courseName="Linear Algebra"
              weeksToGo={9}
              hoursToGo={33}
              percentageCompleted={22}
            /> */}
          </div>
        </div>
      </div>
    </GeneralPageLayout>
  );
};

export default ProfilePage;
