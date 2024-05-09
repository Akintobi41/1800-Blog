import { Link } from "react-router-dom"
import Container from "../container/Container"
import Button from "../button/Button"

function Discover() {
  return (
    <Container>
    <h1 className="flex flex-col mt-32 justify-center s-lg:text-[100px] sm:text-[54px] sm:max-w-full leading-[50px] font-bold p-6 italic min-h-[350px] text-left px-4">
      {" "}
      Discover {`what's`} new
      <small className="block text-[20px] font-normal leading-8 mt-8">
        Explore topics that interest you.📖💻
      </small>
      <div className="flex align-center items-center font-medium mt-6">
        <Link to="/signup" className="">
          {" "}
          <Button className="text-[12px] s-lg:text-[16px] s-lg:h-10 h-8 px-2">
            Get started{" "}
          </Button>
        </Link>{" "}
        <Link
          to="/login"
          className="underline text-[12px] s-lg:text-[16px] ml-2"
        >
          {" "}
          Log in now{" "}
        </Link>{" "}
      </div>
    </h1>
  </Container>
  )
}

export default Discover