import { Title } from "./components/Title";
import { LoginForm } from "./components/LoginForm";

// import "../styles/home.css";

export function HomePage() {
  return (
    <div className="component">
      <Title title="Course Review Session" />
      <LoginForm />
    </div>
  );
}
