import React from "react";
import {useDispatch} from "react-redux";
import authServices from "../../appwrite/auth.js";
import {logout} from "../../store/authSlice.js";
import {removeData as removePostData} from "../../store/postSlice.js";
import {removeData as removeImageData} from "../../store/imageSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authServices.logout().then(() => {
            dispatch(logout())
            dispatch(removePostData())
            dispatch(removeImageData())
        })
    }
    return (
        <button
            onClick={logoutHandler}
            className='px-5 py-2.5 font-semibold text-gray-100
                       bg-red-600 rounded-lg shadow-sm
                       transition-all duration-200 ease-in-out
                       hover:bg-red-700 hover:shadow-md hover:scale-[1.02]
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800
                       cursor-pointer'
        >Logout</button>
    )
}

export default LogoutBtn;