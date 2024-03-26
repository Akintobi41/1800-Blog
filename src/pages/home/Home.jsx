/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "../../components/loader/Loader";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { useQuery } from "@tanstack/react-query";
import appwriteService from "../../appwrite/config";
import { useContext, useEffect } from "react";
import { MyContext } from "./../../MyContext";

function Home() {
  // const fetchData =
  const { data, isLoading, status } = useQuery({
    queryKey: ["data"],
    queryFn: () => appwriteService.getPosts([]),
    staleTime: 60000,
  });
  const { setToggle } = useContext(MyContext);
  const posts = data?.documents;

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full py-8">
        <h2 className="text-xl font-bold px-4">Latest News</h2>
        <Container>
          <div className="flex flex-wrap p-4 justify-center w-full gap-y-[3rem] xs:gap-x-[1rem]">
            {posts?.map((post) => (
              <div className="w-full xs:w-[47%] s-lg:w-[32%]" key={post.$id}>
                <PostCard {...post} />
              </div>
            )) || <h1 className="text-[20px]"> Login to read posts</h1>}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
