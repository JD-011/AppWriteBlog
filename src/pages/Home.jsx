import React, {useEffect, useState} from "react";
import {Container, PostCard} from "../components"
import { useSelector, useDispatch } from 'react-redux';
import {getPosts} from "../store/postSlice.js";
import {getFilePreview} from "../store/imageSlice.js";

function Home() {
    const dispatch = useDispatch();
    const {status: authStatus} = useSelector(state => state.auth);
    const {posts, status} = useSelector(state => state.post);
    const {status: imgStatus} = useSelector(state => state.image);

    useEffect(() => {
        if (status === 'idle' && authStatus) {
            dispatch(getPosts());
        }
    }, [dispatch, authStatus])

    useEffect(() => {
        if (status === "succeeded" && imgStatus === "idle" && authStatus) {
            posts.forEach((post) => {
                dispatch(getFilePreview(post.featuredImage));
            });
        }
    }, [posts, dispatch]);


    if(posts.length === 0 || authStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {authStatus ? "No posts available" : "Login to see posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) =>
                        (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home;