import "../styles/registration.css";
import { Title } from "./components/Title";
import { RegistrationForm } from "./components/RegistrationForm";

export function RegistrationPage() {
  return (
    <div className="registration-bg">
      <div className="registration">
        <Title title="Registration" />
        <RegistrationForm />
      </div>
    </div>
  );
}
