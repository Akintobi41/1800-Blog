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
        <Container>
          <div className="flex flex-wrap p-6 justify-center">
            <swiper-container>
              {
                // posts?.length

                posts.length ? (
                  posts.map((post) => (
                    <swiper-slide className="p-2 w-1/4" key={post.$id}>
                      <PostCard {...post} />
                    </swiper-slide>
                  ))
                ) : (
                  <h1 className="text-[20px]"> Login to read posts</h1>
                )
              }
            </swiper-container>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
