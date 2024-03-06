import appwriteService from "../../appwrite/config";
import { useState, useEffect } from "react";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((newPosts) => {
      if (newPosts) {
        setPosts(newPosts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.length ? (
            posts.map((post, id) => (
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
  );
}

export default Home;
