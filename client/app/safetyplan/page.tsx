import SafetyPlanForm from "./safetyPlanForm";

type SaveResult = { error: string } | { message: string };

export type SaveFunctionT = (
  previousState: SaveResult | undefined,
  formData: FormData
) => Promise<SaveResult>;

const saveFunction = async (previousState: unknown, formData: FormData) => {
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return { error: "Name is required" };
  }

  console.log("Saving safety plan for", name);
  return { message: "form saved" };
};

export default function SafetyPlan() {
  return <SafetyPlanForm action={saveFunction} />;
}
