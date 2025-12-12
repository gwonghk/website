"use client";
import { useActionState } from "react";
import type { SaveFunctionT } from "./page";

const SafetyPlanForm = ({ action }: { action: SaveFunctionT }) => {
  const defaultState = undefined;
  const [data, formAction, isPending] = useActionState(action, defaultState);
  return (
    <form action={formAction}>
      <div className="space-y-4 max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Safety Plan</h1>
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Safety Plan"}
        </button>
        {data && "error" in data && data.error && (
          <p className="text-red-500 mt-2">Error: {data.error}</p>
        )}
        {data && "message" in data && data.message && (
          <p className="text-green-500 mt-2">{data.message}</p>
        )}
      </div>
    </form>
  );
};

export default SafetyPlanForm;
