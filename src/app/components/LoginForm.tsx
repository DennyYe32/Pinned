"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("user-home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-center bg-fixed bg-[url('https://content.r9cdn.net/rimg/dimg/3e/2c/96e426b6-city-17759-1688702c4c5.jpg?crop=true&width=1366&height=768&xhint=739&yhint=908')] bg-cover">
    <div className="grid place-items-center h-screen bg-center bg-fixed bg-red-800/25 bg-cover backdrop-blur-sm">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-red-400 bg-white">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-red-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/sign-up"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
}
