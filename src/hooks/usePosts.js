/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../MyContext';
import appwriteService from '../appwrite/config';

export default function usePosts() {
    const { loader, setToggle, setLoader } = useContext(MyContext)
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        setToggle(false);
        appwriteService.getPosts([]).then((newPosts) => {
            setPosts(newPosts.documents || newPosts);
            setLoader(false);
        })

    }, [])

    return { loader, posts }

}
