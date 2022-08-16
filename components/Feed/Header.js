import { SparklesIcon } from "@heroicons/react/outline";

const Header = ({ title }) => {
    return (
        <div className="sticky top-0 z-50 flex items-center justify-between py-2 px-4 bg-white border-b border-gray-200">
            <h2 className="text-lg font-bold cursor-pointer">{title}</h2>
            <SparklesIcon className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200" />
        </div>
    );
};

export default Header;
