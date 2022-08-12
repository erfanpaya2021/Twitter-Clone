import { DotsHorizontalIcon } from "@heroicons/react/solid";
import Image from "next/image";

const MiniProfile = ({ image, title, subtitle }) => {
    return (
        <div className="hover-effect flex items-center justify-center xl:justify-between">
            <Image
                src={image}
                alt={title}
                width={56}
                height={56}
                className="rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 xl:mr-2 hidden xl:inline-block" />
        </div>
    );
};

export default MiniProfile;
