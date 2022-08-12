import Image from "next/image";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

import { IMAGES } from "@/constants/index";

const Input = () => {
    return (
        <div className="flex space-x-3 p-4 border-b border-gray-200">
            <div>
                <Image
                    src={IMAGES.ProfileIcon}
                    alt="User Image"
                    width="48"
                    height="48"
                    className="rounded-full cursor-pointer hover:brightness-95"
                />
            </div>
            <div className="w-full divide-y divide-gray-200">
                <div>
                    <textarea
                        className="w-full border-none tracking-wide min-h-[56px]  text-gray-700 focus:ring-0 placeholder:text-gray-700 "
                        rows="2"
                        placeholder="What's happening?"
                    ></textarea>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="flex space-x-0">
                        <PhotographIcon className="w-10 h-10 p-2 hover-effect hover:text-sky-500 hover:bg-sky-100 " />
                        <EmojiHappyIcon className="w-10 h-10 p-2 hover-effect hover:text-sky-500 hover:bg-sky-100 " />
                    </div>
                    <button
                        disabled={true}
                        className="px-4 py-1.5 rounded-full font-bold shadow-md bg-blue-500 text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;
