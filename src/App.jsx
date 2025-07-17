import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import authServices from "./appwrite/auth";
import {login, logout} from "./store/authSlice";
import {Header, Footer, Loader} from "./components"
import {Outlet} from "react-router-dom";
import { useSelector } from 'react-redux';
import { getPosts } from "./store/postSlice";
import { getFilePreview } from "./store/imageSlice";

function App() {
    const [loading, setLoading] = useState(true);
    const {status: authStatus} = useSelector(state => state.auth);
    const {posts, status: postStatus} = useSelector(state => state.post);
    const {status: imgStatus} = useSelector(state => state.image);
    const dispatch = useDispatch();

    useEffect(() => {
        authServices.getCurrentUser()
            .then((userData) => {
                if(userData){
                    dispatch(login(userData));
                }else{
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [])

    useEffect(() => {
        if (authStatus && postStatus === "idle") {
            dispatch(getPosts());
        }
    }, [dispatch, postStatus, authStatus]);

    useEffect(() => {
        if (postStatus === "succeeded" && imgStatus === "idle") {
            posts.forEach((post) => {
                dispatch(getFilePreview(post.featuredImage));
            });
        }
    }, [posts, dispatch]);

    return !loading ? (
        <div className={'min-h-screen flex flex-wrap content-between bg-gray-400'}>
            <div className={'w-full block'}>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen">
            <Loader />
        </div>
    );
}

export default App
