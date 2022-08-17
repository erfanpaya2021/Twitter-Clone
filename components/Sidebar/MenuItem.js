import { useRouter } from "next/router";

const MenuItem = ({ Icon, title, active, path }) => {
    const router = useRouter();

    const backToHome = () => {
        if (path.trim().length > 0) {
            router.push(path);
        }
    };
    return (
        <li
            onClick={backToHome}
            className="hover-effect w-full flex items-center justify-center xl:justify-start space-x-2 text-gray-700 dark:text-slate-500 dark:hover:bg-slate-700"
        >
            <Icon className="w-8 h-8" />
            <span className={`hidden xl:inline ${active && "font-bold"}`}>{title}</span>
        </li>
    );
};

export default MenuItem;
