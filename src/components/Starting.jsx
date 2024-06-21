import { Link } from "react-router-dom";

export default function Starting() {
  return (
    <div className="container">
      <h1 className="heading">Welcome to My Website!</h1>
      <p className="description">
        I'm excited to have you here. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <Link to="/login">Get Started</Link>
    </div>
  );
}
