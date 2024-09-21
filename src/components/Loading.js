import { BsArrowCounterclockwise } from "react-icons/bs";

function Loading() {
  return (
    <div className="flex flex-row justify-center backdrop-blur min-h-96">
      <div className="flex flex-col justify-center text-5xl animate-spin ">
        <BsArrowCounterclockwise />
      </div>
    </div>
  )
}

export default Loading