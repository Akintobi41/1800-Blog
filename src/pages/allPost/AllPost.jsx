import appwriteService from "../../appwrite/config";
import { useState, useEffect } from "react";
import Container from "./../../components/container/Container";
import PostCard from "./../../components/postCard/PostCard";
import { useContext } from "react";
import { MyContext } from "../../MyContext";
import Home from "../home/Home";

function AllPost() {
  const { setToggle } = useContext(MyContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setToggle(false); // reset hamburger menu
    appwriteService.getPosts([]).then((newPosts) => {
      if (newPosts) {
        setPosts(newPosts.documents);
      }
    });
  }, []);

  return (
    // <div className="w-full py-8">
    //   <Container>
    //     <div className="flex flex-wrap">
    //       {posts?.length ? (
    //         posts.map((post) => (
    //           <div className="p-2 w-full" key={post.$id}>
    //             <PostCard {...post} />
    //           </div>
    //         ))
    //       ) : (
    //         <h1> No posts to display yet</h1>
    //       )}
    //     </div>
    //   </Container>
    // </div>
    <Home />
  );
}

export default AllPost;
