/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "../../components/loader/Loader";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import appwriteService from "../../appwrite/config";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./../../MyContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  }, []);

  function handleMorePosts() {
    setNext(next + postPerSlide);
  }

  const sortedPosts = posts?.sort((a, b) =>
    a.$createdAt < b.$createdAt ? 1 : -1,
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pb-8">
          {authStatus ? (
            <>
              {posts?.length > 0 && (
                <h2 className="text-xl font-bold px-4 pt-8">Latest Blogs</h2>
              )}
              <Container>
                <div className="flex flex-wrap px-4 mt-6 justify-center w-full gap-y-[3rem] xs:gap-x-[1rem]">
                  {sortedPosts?.slice(0, next)?.map((post) => (
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
              <h1 className="text-[18px] p-6 italic text-center max-w-[400px]">
                {" "}
                Already a member? Welcome back!{" "}
                <Link to="/login" className="hover:underline">
                  {" "}
                  Sign in now{" "}
                </Link>{" "}
                to discover what's new and explore topics that interest you.
                📖💻
              </h1>
            </Container>
          )}
          {next < posts?.length && (
            <p
              className="flex justify-center font-bold mt-4 text-center cursor-pointer text-[var(--secondary-color)]"
              onClick={handleMorePosts}
            >
              Load more{" "}
              <img
                src="/Icons/down-arrow.png"
                alt="load-more"
                className="w-5 h-5 mt-[.4rem] ml-[.2rem]"
              />
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
