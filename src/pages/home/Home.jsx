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
import Loader from "../../components/loader/Loader";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { sortData } from "./../../utils/sortData/sortData";
import Discover from "../../components/discover/Discover";
import { motion } from "framer-motion";
import Button from "../../components/button/Button";

function Home() {
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
  }, []);

  function handleMorePosts() {
    setNext(next + postPerSlide);
  }

  const h1Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {authStatus ? (
            <>
              {posts?.length > 0 && (
                <h2 className="text-xl font-bold pt-8 max-w-[2000px] px-4 mx-auto">
                  Latest Blogs
                </h2>
              )}
              <Container>
                <div className="flex flex-wrap px-4 pb-8 mt-6 w-full gap-y-[3rem] xs:gap-x-[1rem]">
                  {sortData(posts, "$updatedAt")
                    ?.slice(0, next)
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
                      <motion.section
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.8 }}
                      variants={h1Variants}
                        className="w-full flex flex-col gap-8 min-h-[400px] max-w-[600px] justify-center">
                        <h1 className="font-semibold">Welcome to My Blog!</h1>
                        <p>We're excited to have you here. Our blog is a space for sharing thoughts, stories, and experiences. We can't wait to hear from you!</p>
                        <Link to='/add-post'>
                        <Button className="italic">Share Your First Post</Button>
                        </Link> 
                      </motion.section>
                    ))}{" "}
                </div>
              </Container>
            </>
          ) : (
            <Discover />
          )}
          {authStatus && next < posts?.length && (
            <p
              className="flex justify-center font-bold mt-4 mb-2 text-center cursor-pointer text-[var(--black)]"
              onClick={handleMorePosts}
            >
              Load more{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mt-[.4rem] ml-[.2rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
