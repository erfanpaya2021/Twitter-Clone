import { SparklesIcon } from "@heroicons/react/outline";

const Feed = () => {
    return (
        <section className="sm:ml-[74px] sm:flex-grow xl:ml-[370px] xl:min-w-[576px] border-l border-r border-gray-200 w-full max-w-xl">
            <div className="sticky top-0 z-50 flex items-center justify-between py-2 px-4 bg-white border-b border-gray-200">
                <h2 className="text-lg font-bold cursor-pointer">Home</h2>
                <SparklesIcon className="h-10 rounded-full p-2 cursor-pointer hover:bg-gray-200" />
            </div>
        </section>
    );
};

export default Feed;
