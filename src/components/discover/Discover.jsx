import { Link } from "react-router-dom";
import Container from "../container/Container";
import Button from "../button/Button";

function Discover() {
  return (
    <Container>
      <h1 className="flex flex-col mt-20 mb-16 justify-center s-lg:text-[100px] s-lg:leading-[5rem] sm:text-[54px] sm:max-w-full font-bold p-6 italic h-[300px] text-left px-4">
        {" "}
        Discover {`what's`} new
        <small className="block text-[14px] font-normal leading-[4rem]">
          Explore topics that interest you.📖💻
        </small>
        <div className="flex align-center items-center font-medium">
          <Link to="/signup">
            {" "}
            <Button className="text-[12px] s-lg:text-[16px] s-lg:h-10" height="h-8" px="px-2">
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
  );
}

export default Discover;
