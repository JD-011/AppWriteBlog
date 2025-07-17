import {useEffect, useState} from "react";
import {Container, PostForm, Loader} from "../components"
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const {posts, status: postStatus} = useSelector(state => state.post);

    useEffect(() => {
        if (slug) {
            setPost(posts.find(post => post.$id === slug) || null);
        } else {
            navigate('/')
        }
    }, [slug, navigate, posts])

    if (postStatus === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return post ? (
        <div className={'py-8'}>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;