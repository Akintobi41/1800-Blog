import appwriteService from "../../appwrite/config";
import { useState, useEffect } from "react";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";
import usePosts from "../../hooks/usePosts";

function Home() {
  // console.log(appwriteService);
  // const [posts, setPosts] = useState([]);
  // const [homePosts, setHomePosts] = useState([]);
  // const { setToggle, loader, setLoader } = useContext(MyContext);

  // useEffect(() => {
  //   setLoader(true);
  //   setToggle(false);

  //   appwriteService.getPosts([]).then((newPosts) => {
  //     if (newPosts) {
  //       setPosts(newPosts.documents);
  //     } else {
  //       setPosts(newPosts);
  //     }
  //     setLoader(false);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { loader, posts } = usePosts();

  console.log(loader, "loader");
  console.log(posts, "posts");

  return (
    <>
      {loader && <Loader />}

      <div className="w-full py-8">
        <h2 className="text-xl font-bold px-4">Latest News</h2>
        <Container>
          <div className="flex flex-wrap p-4 justify-center w-full gap-y-[3rem] xs:gap-x-[1rem]">
            {posts.length ? (
              posts.map((post) => (
                <div className="w-full xs:w-[47%] s-lg:w-[32%]" key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <h1 className="text-[20px]"> Login to read posts</h1>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
