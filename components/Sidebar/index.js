import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";

import MenuItem from "./MenuItem";
import MiniProfile from "./MiniProfile";

import { IMAGES, MENU_ITEMS, PRIVATE_MENU_ITEMS } from "@/constants/index";

const Sidebar = () => {
    const { data: session, status } = useSession();

    return (
        <aside className="hidden sm:flex flex-col p-2 xl:items-start h-full fixed xl:ml-24">
            {/* Twitter Logo */}
            <div className="hover-effect w-12 h-12 p-1 hover:bg-blue-100">
                <Image src={IMAGES.TwitterLogo} alt="Twitter Logo" className="w-12 h-12" />
            </div>

            {/* Menu */}
            <ul className="w-full space-y-1 my-4">
                {MENU_ITEMS.map((menuItem) => (
                    <MenuItem
                        key={menuItem.title}
                        title={menuItem.title}
                        Icon={menuItem.icon}
                        active={menuItem.active}
                        private={menuItem.private}
                        status={status}
                    />
                ))}
                {status === "authenticated" &&
                    PRIVATE_MENU_ITEMS.map((menuItem) => (
                        <MenuItem
                            key={menuItem.title}
                            title={menuItem.title}
                            Icon={menuItem.icon}
                            active={menuItem.active}
                            private={menuItem.private}
                            status={status}
                        />
                    ))}
            </ul>

            {/* Button */}
            {status === "authenticated" ? (
                <button className="hidden xl:inline bg-blue-400 text-white text-md rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 mb-4">
                    Tweet
                </button>
            ) : (
                <button
                    onClick={signIn}
                    className="hidden xl:inline bg-blue-400 text-white text-md rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 mb-4"
                >
                    Sign in
                </button>
            )}

            {/* Mini Profile */}
            {status === "authenticated" && <MiniProfile session={session} signOut={signOut} />}
        </aside>
    );
};

export default Sidebar;
