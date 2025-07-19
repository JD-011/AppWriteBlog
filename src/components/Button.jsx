import React from "react";

export default function Button({
                                   children,
                                   type = "button",
                                   bgColor = "bg-blue-500",
                                   textColor = "text-gray-100",
                                   className = "",
                                   ...props
}) {
    return (
        <button className={`px-5 py-2.5 font-semibold rounded-lg shadow-md
                           transition-all duration-200 ease-in-out
                           hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02]
                           active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                           cursor-pointer
                           ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}