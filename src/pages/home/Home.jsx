/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MyContext } from "./../../MyContext";
import appwriteService from "../../appwrite/config";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { sortData } from "./../../utils/sortData/sortData";
import { motion } from "framer-motion";

function Home({ authentication }) {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => appwriteService.getPosts([]),
  });
  const { setToggle } = useContext(MyContext);
  const posts = data?.documents;
  const authStatus = useSelector((state) => state.auth.status);
  const postPerSlide = 6;
  const [next, setNext] = useState(postPerSlide);

  useEffect(() => {
    setToggle(false);
    window.scrollTo(0, 0);
  }, []);

  function handleMorePosts() {
    setNext(next + postPerSlide);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          className="w-full pb-8"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          {authStatus ? (
            <>
              {posts?.length > 0 && (
                <h2 className="text-xl font-bold pt-8 max-w-[2000px] px-4 mx-auto">
                  Latest Blogs
                </h2>
              )}
              <Container>
                <div className="flex flex-wrap px-4 mt-6 w-full gap-y-[3rem] xs:gap-x-[1rem]">
                  {sortData(posts, "$updatedAt")
                    .slice(0, next)
                    ?.map((post) => (
                      <div
                        className="w-full xs:w-[48%] s-lg:w-[32%]"
                        key={post.$id}
                      >
                        <PostCard {...post} />
                      </div>
                    ))}
                  {!posts ||
                    (posts.length === 0 && (
                      <p>
                        Exciting post you would like to share,{" "}
                        <Link to="/add-post" className="italic">
                          {" "}
                          let{`'`}s begin
                        </Link>
                      </p>
                    ))}{" "}
                </div>
              </Container>
            </>
          ) : (
            <Container>
              <h1 className=" flex flex-col justify-center s-lg:text-[100px] sm:text-[54px] sm:max-w-full leading-[50px] font-bold p-6 italic min-h-[350px] text-left px-4">
                {" "}
                Discover what's new
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
          )}
          {next < posts?.length && (
            <p
              className="flex justify-center font-bold mt-4 text-center cursor-pointer text-[var(--black)]"
              onClick={handleMorePosts}
            >
              Load more{" "}
              <img
                src="/Icons/down-arrow.png"
                alt="load-more"
                className="w-4 h-4 mt-[.4rem] ml-[.2rem]"
              />
            </p>
          )}
        </motion.div>
      )}
    </>
  );
}

export default Home;
