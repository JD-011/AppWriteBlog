import {useEffect, useState} from "react";
import {Container, PostForm} from "../components"
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
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading post...
                            </h1>
                        </div>
                    </div>
                </Container>
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