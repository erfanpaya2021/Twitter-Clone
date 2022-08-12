import React from "react";

const User = ({ user }) => {
    const { name, login, picture } = user;

    return (
        <div className="flex items-center hover:bg-gray-200 p-3 transition-colors duration-200 ">
            <img
                src={picture.thumbnail}
                width="48"
                height="48"
                alt={user.name}
                className="rounded-full mr-2"
            />
            <div className="w-[60%] space-y-2">
                <h6 className="text-[15px]   font-medium hover:underline cursor-pointer">
                    {name.first} {name.last}
                </h6>
                <span className="text-[15px]   text-gray-500 ">{login.username}</span>
            </div>
            <button className="block h-9 text-[15px]   leading-3 px-4 py-2 rounded-full font-bold shadow-md bg-blue-500 text-white hover:brightness-95">
                Follow
            </button>
        </div>
    );
};

export default User;
