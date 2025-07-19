import React from 'react'
import { Link } from 'react-router-dom'
import {Logo} from "../index.js";

function Footer() {
    return (
        // Footer background: Similar to header (gray-800) for visual consistency,
        // or slightly darker (gray-900) to blend with body. Let's use gray-800 for clarity.
        // Border-top: A subtle border for separation, matching other dark theme borders.
        <section className="relative overflow-hidden py-10 bg-gray-800 border-t-2 border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-6"> {/* px-6 for consistency with Header/Container */}
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                {/* Logo will inherit light text color, width passed */}
                                <Logo width="100px" />
                            </div>
                            <div>
                                {/* Copyright text: Lighter gray for readability, slightly subdued */}
                                <p className="text-sm text-gray-400">
                                    &copy; Copyright 2023. All Rights Reserved by Bloggers.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Company, Support, Legals sections */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            {/* Heading: Subdued light gray, uppercase, font-semibold for clarity */}
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                                Company
                            </h3>
                            <ul>
                                {/* Links: Default text-gray-200, hover to brighter text-gray-50, smooth transition */}
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-200 transition-colors duration-200 hover:text-gray-50"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer