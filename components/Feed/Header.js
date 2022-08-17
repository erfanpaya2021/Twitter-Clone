import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";

import { MoonIcon, SunIcon, UserAddIcon, LogoutIcon } from "@heroicons/react/outline";

const Header = ({ title }) => {
    const { data: session, status } = useSession();
    const { theme, setTheme } = useTheme();

    const themeToggle = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const authHandler = () => {
        if (status === "authenticated") {
            signOut();
        } else {
            signIn();
        }
    };

    return (
        <div className="sticky top-0 z-50 flex items-center justify-between py-2 px-4 bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-500">
            <h2 className="text-lg font-bold cursor-pointer">{title}</h2>
            <div className="flex items-center">
                {status === "authenticated" ? (
                    <LogoutIcon
                        onClick={authHandler}
                        className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:text-slate-500 dark:hover:bg-slate-700"
                    />
                ) : (
                    <UserAddIcon
                        onClick={authHandler}
                        className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:text-slate-500 dark:hover:bg-slate-700"
                    />
                )}
                {theme === "dark" ? (
                    <MoonIcon
                        onClick={themeToggle}
                        className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:text-slate-500 dark:hover:bg-slate-700"
                    />
                ) : (
                    <SunIcon
                        onClick={themeToggle}
                        className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:text-slate-500 dark:hover:bg-slate-700"
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
