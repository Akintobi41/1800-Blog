/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "../../components/loader/Loader";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import appwriteService from "../../appwrite/config";
import { useContext, useEffect } from "react";
import { MyContext } from "./../../MyContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home({ authentication }) {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => appwriteService.getPosts([]),
    staleTime: 60000,
  });
  const { setToggle } = useContext(MyContext);
  const posts = data?.documents;
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full py-8">
          {authStatus ? (
            <>
              <h2 className="text-xl font-bold px-4">Latest News</h2>
              <Container>
                <div className="flex flex-wrap p-4 justify-center w-full gap-y-[3rem] xs:gap-x-[1rem]">
                  {posts?.map((post) => (
                    <div
                      className="w-full xs:w-[47%] s-lg:w-[32%]"
                      key={post.$id}
                    >
                      <PostCard {...post} />
                    </div>
                  )) || (
                    <p>
                      Exciting post you would like to share, let{`'`}s begin
                    </p>
                  )}{" "}
                </div>
              </Container>
            </>
          ) : (
            <Container>
              <h1 className="text-[18px] p-6 italic">
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
        </div>
      )}
    </>
  );
}

export default Home;
