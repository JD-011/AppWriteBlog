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
        // Set the entire application's background to a deep dark gray (gray-900)
        // and default text color to a light gray (gray-100) for contrast.
        // Use flex-col and justify-between to push the footer to the bottom.
        <div className="min-h-screen flex flex-col justify-between
                        bg-gray-900 text-gray-100">
            <div className="w-full flex-grow"> {/* This div takes up available space, pushing footer down */}
                <Header />
                {/* Global padding for the main content area, ensures space around pages */}
                <main className="py-10 px-6">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    ) : (
        // The loader screen also gets the dark background for consistency
        <div className="flex items-center justify-center min-h-screen
                        bg-gray-900">
            <Loader />
        </div>
    );
}

export default App
