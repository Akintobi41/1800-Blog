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
        <div
        >
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
