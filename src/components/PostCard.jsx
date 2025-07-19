import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

function PostCard({$id, title, featuredImage}) {
    const {images} = useSelector(state => state.image);
    let url = images.find(image => image.id === featuredImage)?.url;

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-800 rounded-3xl p-4
                            transition-all duration-300 ease-in-out
                            hover:bg-gray-700 hover:shadow-xl hover:scale-[1.03]
                            cursor-pointer'>
                <div className='mb-4 overflow-hidden rounded-full aspect-square mx-auto relative'>
                    <img src={url} alt={title}
                         className='absolute inset-0 w-full h-full object-cover rounded-full transform transition-transform duration-300 ease-in-out hover:scale-105' />
                </div>
                <h2
                    className='text-xl font-bold text-gray-100 text-center'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard