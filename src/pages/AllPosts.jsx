import {Container, PostCard, Loader} from "../components"
import { useSelector } from 'react-redux';


function AllPosts() {
    const {posts, status: postStatus} = useSelector(state => state.post);

    if (postStatus === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
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

export default AllPosts;