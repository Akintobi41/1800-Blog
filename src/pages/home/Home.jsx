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
    setToggle(false);
    appwriteService.getPosts([]).then((newPosts) => {
      if (newPosts) {
        setPosts(newPosts.documents);
      }
      console.log("jg");
      setLoader(false);
    });
  }, []);

  return (
    <>
      {loader && <Loader />}

      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.length ? (
              posts.map((post) => (
                <div className="p-2 w-1/4" key={post.$id}>
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
