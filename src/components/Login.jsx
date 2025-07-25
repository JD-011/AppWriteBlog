import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login as authLogin} from "../store/authSlice.js";
import {Button, Input, Logo} from "./index.js"
import {useDispatch} from "react-redux";
import authServices from "../appwrite/auth.js"
import {useForm} from "react-hook-form";

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try{
            const session = await authServices.login(data);
            if(session){
                const userData = await authServices.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full min-h-[calc(100vh-8rem)] py-8'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-gray-700 shadow-xl text-gray-100`}>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[120px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-300">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-400 transition-all duration-200 no-underline hover:text-blue-300 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;