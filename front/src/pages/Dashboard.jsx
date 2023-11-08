// import { Link } from "react-router-dom";
// import "../styles/home.css";
import { Title } from "./components/Title";

export function Dashboard() {
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  console.log("curr user: ")
  console.log(currUser);

  return (
    <div className='component'>
      <Title title='Dashboard' />
    </div>
  );
}
