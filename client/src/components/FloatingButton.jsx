import { useNavigate } from "react-router-dom";
import "../styles/fab.css";

function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button className="fab" onClick={() => navigate("/create")}>
      +
    </button>
  );
}

export default FloatingButton;
