import appwriteService from "../../appwrite/config";
import { useState, useEffect } from "react";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const { toggle, setToggle, loader, setLoader } = useContext(MyContext);

  useEffect(() => {
    setLoader(true);
    setToggle(false);

    appwriteService.getPosts([]).then((newPosts) => {
      if (newPosts) {
        setPosts(newPosts.documents);
      } else {
        setPosts(newPosts);
      }
      setLoader(false);
    });
  }, []);
  console.log(posts);

  return (
    <>
      {loader && <Loader />}

      <div className="w-full py-8">
        <h2 className="text-xl font-bold px-4">Latest News</h2>
        <Container>
          <div className="flex flex-wrap p-4 justify-center w-full gap-y-[3rem]">
            {posts.length ? (
              posts.map((post) => (
                <div className="w-full xs:w-1/2" key={post.$id}>
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
