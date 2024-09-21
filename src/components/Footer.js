import { useNavigate } from 'react-router-dom';
import { IoAddSharp } from "react-icons/io5";
import ImageButton from "./ImageButton";

function Footer() {
  const navigate = useNavigate();
  
  return (
      <div className="min-w-full h-24 bg-black items-center">
        <div className="flex flex-row justify-center min-w-full h-24 bg-black items-center">
          <ul className="flex flex-row justify-between text-white">
            <li>
              <ImageButton type="button" label="Filter" img={<IoAddSharp />} color="blue" onClick={() => navigate("/execute-operation")}/>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Footer;