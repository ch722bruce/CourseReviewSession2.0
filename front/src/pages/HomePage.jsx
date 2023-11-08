import { Title } from "./components/Title";
import { LoginForm } from "./components/LoginForm";

import "../styles/home.css";

export function HomePage() {
  return (
    <div className="home-bg">
      <div className="home">
        <Title title="Course Review Session" />
        <LoginForm />
      </div>
    </div>
  );
}
