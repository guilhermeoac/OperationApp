import { useNavigate } from 'react-router-dom';
import { IoAddSharp } from "react-icons/io5";
import ImageButton from "./ImageButton";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-black flex items-center justify-center">
      <ul className="flex items-center space-x-4 text-white">
        <li>
          <ImageButton type="button" label="Add" img={<IoAddSharp />} color="blue" onClick={() => navigate("/execute-operation")} />
        </li>
      </ul>
    </div>
  );
}

export default Footer;