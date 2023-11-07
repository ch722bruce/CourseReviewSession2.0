// import "./styles/home.css";
import { Title } from "./components/Title";
import { RegistrationForm } from "./components/RegistrationForm";

export function RegistrationPage() {
  return <div className="component">
    <Title title="Registration" />
    <RegistrationForm />
  </div>;
}
