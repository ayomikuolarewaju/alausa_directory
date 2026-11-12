"use client";

import { useActionState } from "react";
import { signInAdmin } from "@/app/actions";
import type { AuthActionState } from "@/lib/actions.types";

const initialState: AuthActionState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(signInAdmin, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-lg border-2 border-black px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border-2 border-black px-3 py-2"
        />
      </div>
      {state.error && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg border-2 border-black bg-blue-900 px-4 py-2 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
