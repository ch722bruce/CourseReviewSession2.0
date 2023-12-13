import "../styles/home.css";
import { Title } from "./components/Title";
import { LoginForm } from "./components/LoginForm";

export function HomePage() {
  return (
    <div className="home-bg">
      <div className="home">
        <Title title="Login" />
        <LoginForm />
      </div>
    </div>
  );
}
