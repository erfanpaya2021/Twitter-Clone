import Image from "next/image";

import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/outline";

const Post = ({ id, name, username, userImage, postImage, text, timestamp }) => {
    return (
        <article className="flex space-x-3 p-4 border-b border-gray-200">
            {/* Left side | Image */}
            <div>
                <Image
                    src={userImage}
                    alt="User Image"
                    width="48"
                    height="48"
                    className="rounded-full cursor-pointer hover:brightness-95"
                />
            </div>
            {/* Right side */}
            <div className="w-full ml-4">
                {/* Post Header */}
                <div className="flex items-center justify-between w-full p-2">
                    <div className="flex items-start flex-col sm:flex-row sm:items-end  space-x-1">
                        <h3 className=" font-bold hover:underline">{name}</h3>
                        <h4 className="text-sm text-gray-500">
                            @{username} - <span className="hover:underline">{timestamp}</span>
                        </h4>
                    </div>
                    <DotsHorizontalIcon className="hover-effect w-10 h-10 p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
                {/* Post Body */}
                <div>
                    <p className="text-gray-800 text-sm mb-2">{text}</p>
                    <Image
                        src={postImage}
                        alt="PostImage"
                        width="400"
                        height="300"
                        layout="responsive"
                        className="rounded-3xl"
                    />
                </div>

                {/* Post Footer */}
                <div className="flex items-center justify-between pt-3">
                    <ChatIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100" />
                    <HeartIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100" />
                    <TrashIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100" />
                    <ShareIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </article>
    );
};

export default Post;
