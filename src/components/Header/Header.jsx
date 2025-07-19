import React from "react";
import {Container, Logo, LogoutBtn} from "../index.js"
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
    ]

    return (
        <header className="py-4 px-6 bg-gray-800 border-b border-gray-700 shadow-xl">
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='mr-6'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex items-center gap-x-4'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='px-5 py-2.5 font-semibold text-gray-100
                                                   bg-gray-700 rounded-lg shadow-sm
                                                   transition-all duration-200 ease-in-out
                                                   hover:bg-gray-600 hover:shadow-md hover:scale-[1.02]
                                                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                                                   cursor-pointer'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;