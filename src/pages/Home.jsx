import {Container, PostCard, Loader} from "../components"
import { useSelector} from 'react-redux';

function Home() {
    const {status: authStatus} = useSelector(state => state.auth);
    const {posts, status: postStatus} = useSelector(state => state.post);

    if (postStatus === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if(posts.length === 0 || authStatus === false) {
        return (
            <div className="w-full py-10 flex flex-col items-center justify-center min-h-[60vh]">
                <Container>
                    <h1 className="text-3xl font-bold text-gray-100 transition-colors duration-200 hover:text-gray-300 text-center">
                        {authStatus ? "No posts available" : "Login to see posts"}
                    </h1>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-10'>
            <Container>
                <div className='flex flex-wrap -mx-2 justify-center'>
                    {posts.map((post) =>
                        (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
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