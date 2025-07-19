import React from "react";
// Make sure this path is correct based on where you saved the PNG icon!
import logoIcon from '../assets/logo.png';

function Logo({width = '70px'}){
    return(
        <div className="flex items-center space-x-2">
            <div className={`flex-shrink-0 rounded-full overflow-hidden`} style={{ width: width, height: width }}>
                <img
                    src={logoIcon}
                    alt="Bloggers Icon"
                    className="h-full w-full object-cover bg-gray-700"
                />
            </div>
        </div>
    )
}

export default Logo;