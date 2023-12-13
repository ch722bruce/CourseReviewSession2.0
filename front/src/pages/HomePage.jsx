import "../styles/home.css";
import { Title } from "./components/Title";
import { LoginForm } from "./components/LoginForm";

export function HomePage() {
  return (
    <div className="home-bg">
      <title>Login</title>
      <meta
        name="description"
        content="Login to access your account and manage your preferences."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="home">
        <Title title="Login" />
        <LoginForm />
      </div>
    </div>
  );
}
