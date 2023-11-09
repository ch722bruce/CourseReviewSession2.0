import { Title } from "./components/Title";
import { RegistrationForm } from "./components/RegistrationForm";

import "../styles/registration.css";

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
