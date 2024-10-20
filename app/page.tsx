"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const courseExamples = [
    { id: 1, title: "Introduction to React", duration: "2 hours" },
    { id: 2, title: "Advanced TypeScript", duration: "3 hours" },
    { id: 3, title: "Next.js Fundamentals", duration: "2.5 hours" },
    { id: 4, title: "Building APIs with Node.js", duration: "4 hours" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Tutorial Course</h1>
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-4 p-4 w-full max-w-2xl">
          <p className="text-xl">Welcome, {user.email ?? "learner"}!</p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Available Courses:</h2>
          <ul className="list-none">
            {courseExamples.map((course) => (
              <li key={course.id} className="bg-gray-100 p-4 rounded-lg mb-2 text-left">
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="text-sm text-gray-600">Duration: {course.duration}</p>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-lg">Please log in to access our tutorial courses.</p>
          <button className="btn btn-primary" onClick={openAuthModal}>
            Login
          </button>
        </div>
      )}
    </main>
  );
}
