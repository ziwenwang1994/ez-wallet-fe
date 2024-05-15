import { useNavigate } from "react-router-dom";
import EZButton from "../components/EZButton";
import WelcomeMessage from "../components/WelcomeMessage";

export function Home() {
    const navigate = useNavigate();
  return (
    <div className="p-[8px]">
      <WelcomeMessage />
      <section className="my-[16px]">
        <EZButton type="primary">Sign-in an exist wallet</EZButton>
        <EZButton onClick={() => navigate("/create")} >Create a new wallet</EZButton>
      </section>
    </div>
  );
}
