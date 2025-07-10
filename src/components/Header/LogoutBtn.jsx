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
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn;