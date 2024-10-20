"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Image from 'next/image';

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const courseExamples = [
    { id: 1, svgPath: "/course1.svg" },
    { id: 2, svgPath: "/course2.svg" },
    { id: 3, svgPath: "/course3.svg" },
    { id: 4, svgPath: "/course4.svg" },
    { id: 5, svgPath: "/course5.svg" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 justify-start text-center">
      <h1 className="text-2xl font-bold mb-4">Tutorial Courses</h1>
      {signerStatus.isInitializing ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : user ? (
        <div className="flex flex-col gap-4 w-full">
          <p className="text-lg">Welcome, {user.email ?? "learner"}!</p>
          <h2 className="text-xl font-semibold mt-2 mb-1">Available Courses:</h2>
          <div className="overflow-x-auto pb-4 -mx-4">
            <div className="flex space-x-4 px-4">
              {courseExamples.map((course) => (
                <div key={course.id} className="flex-shrink-0 w-[90vw] h-[33vh] relative">
                  <Image
                    src={course.svgPath}
                    alt={`Course ${course.id}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-[80vh]">
          <p className="text-lg">Please log in to access our courses.</p>
          <button className="btn btn-primary" onClick={openAuthModal}>
            Login
          </button>
        </div>
      )}
    </main>
  );
}
