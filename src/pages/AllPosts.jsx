import React, {useEffect} from "react";
import {Container, PostCard} from "../components"
import { useSelector, useDispatch } from 'react-redux';
import {getPosts} from "../store/postSlice.js";
import {getFilePreview} from "../store/imageSlice.js";


function AllPosts() {
    const dispatch = useDispatch();
    const {posts, status} = useSelector(state => state.post);
    const {status: imgStatus} = useSelector(state => state.image);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getPosts());
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === "succeeded" && imgStatus === "idle") {
            posts.forEach((post) => {
                dispatch(getFilePreview(post.featuredImage));
            });
        }
    }, [status, imgStatus, posts, dispatch]);

    return (
        <div className={'w-full py-8'}>
            <Container>
                <div className={'flex flex-wrap'}>
                    {posts.map((post) => (
                        <div key={post.$id} className={'p-2 w-1/4'}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;