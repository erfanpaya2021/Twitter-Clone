import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
    return (
        <div className="sticky top-0 w-[90%] xl:[75%] bg-white z-50 space-y-5">
            <div className="relative flex items-center  p-3 rounded-full">
                <SearchIcon className="h-6 z-50 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search Twitter"
                    className="absolute inset-0 rounded-full pl-12 bg-gray-100 border-gray-500 text-gray-700 focus:bg-white focus:shadow-lg focus:border-gray-500"
                />
            </div>
        </div>
    );
};

export default SearchBar;
