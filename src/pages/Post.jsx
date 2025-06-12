import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import {useDispatch, useSelector} from "react-redux";
import storageServices from "../appwrite/storage.js";
import dbServices from "../appwrite/CRUD.js";
import {getPosts} from "../store/postSlice.js";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const {posts} = useSelector(state => state.post);
    const {images} = useSelector(state => state.image);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            const post = posts.find(post => post.$id === slug);
            if (post) setPost(post);
            else navigate("/");
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dbServices.deletePost(post.$id).then((status) => {
            if (status) {
                storageServices.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
        dispatch(getPosts());
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={images.find(image => image.id === post.featuredImage)?.url}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}