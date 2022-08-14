import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

const MiniProfile = ({ session, signOut }) => {
    return (
        <div className="hover-effect flex items-center justify-center xl:justify-between ">
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={56}
                height={56}
                className="rounded-full xl:mr-2"
                onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
            />
            <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold ">{session?.user?.name}</h4>
                <p className="text-[14px] text-gray-500 max-w-[150px] break-words">
                    @{session?.user?.username}
                </p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-2 xl:mr-2 hidden xl:inline-block" />
        </div>
    );
};

export default MiniProfile;
