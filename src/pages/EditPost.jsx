import React, {useEffect, useState} from "react";
import {Container, PostForm} from "../components"
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const {posts} = useSelector(state => state.post);

    useEffect(() => {
        if (slug) {
            setPost(posts.find(post => post.$id === slug) || null);
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className={'py-8'}>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;