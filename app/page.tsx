"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
import { UserProfile } from "@auth0/nextjs-auth0";

const Home = () => {
  const { user, error, isLoading } = useUser();
  console.log("User", user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const userArray = Array.isArray(user) ? user : [user as UserProfile];

    return (
      <main className="flex min-h-screen flex-row items-stretch">
        <div className="z-10 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="bg-white w-full text-slate-950">
          User -
          <ul>
            {userArray.map((userData, index) => (
              <li key={index}>{userData.email}</li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
  return redirect("/api/auth/login");
};

export default Home;
