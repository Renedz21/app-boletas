import { StepKeys } from "@/modules/schemas/login.schema";
import CompleteProfileStep from "./complete-profile";
import CreateAccountStep from "./create-account";

type StepContentProps = {
  stepKey: StepKeys;
};

export default function StepContent({ stepKey }: StepContentProps) {
  switch (stepKey) {
    case "personalInformation":
      return <CompleteProfileStep />;
    case "account":
      return <CreateAccountStep />;
    default:
      return null;
  }
}
