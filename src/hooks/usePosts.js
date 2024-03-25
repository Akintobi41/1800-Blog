/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { MyContext } from '../MyContext';
import { useContext } from 'react';


export default function usePosts() {

    const [posts, setPosts] = useState([]);
    const { loader, setToggle, setLoader } = useContext(MyContext)

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
        })

    }, [])

    return { loader, posts }

}
