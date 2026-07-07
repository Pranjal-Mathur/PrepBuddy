import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { isLoading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate('/');
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <section className="mx-auto w-full max-w-xl">
        <h1 className="mb-8 text-5xl font-extrabold leading-tight tracking-normal text-white">
          Register
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-3 block text-2xl font-semibold text-white"
            >
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              className="w-full rounded-2xl bg-white px-6 py-4 text-xl text-zinc-900 outline-none ring-1 ring-zinc-300 placeholder:text-zinc-500 focus:ring-4 focus:ring-cyan-400/35"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-3 block text-2xl font-semibold text-white"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              className="w-full rounded-2xl bg-white px-6 py-4 text-xl text-zinc-900 outline-none ring-1 ring-zinc-300 placeholder:text-zinc-500 focus:ring-4 focus:ring-cyan-400/35"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-3 block text-2xl font-semibold text-white"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full rounded-2xl bg-white px-6 py-4 text-xl text-zinc-900 outline-none ring-1 ring-zinc-300 placeholder:text-zinc-500 focus:ring-4 focus:ring-cyan-400/35"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-violet-500 px-6 py-4 text-xl font-bold text-zinc-950 shadow-lg shadow-violet-950/40 transition hover:bg-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-2xl font-semibold text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 underline decoration-cyan-900 underline-offset-2 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
