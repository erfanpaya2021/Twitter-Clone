import { useState } from "react";
import News from "./News";
import SearchBar from "./SearchBar";

const Widgets = ({ news, users }) => {
    const [articlesCount, setArticlesCount] = useState(3);

    return (
        <aside className="hidden lg:block xl:w-[400px] ml-8 py-4">
            {/* Search */}
            <SearchBar />

            {/* News */}
            <div className="w-[90%] xl:[75%] rounded-xl bg-gray-100 text-gray-700 space-y-3">
                <h4 className="text-md  p-3 font-bold">What&apos;s Happening</h4>
                {news.slice(0, articlesCount).map((article) => (
                    <News key={article.title} article={article} />
                ))}
                <button
                    className=" p-3 text-blue-300 hover:text-blue-500"
                    onClick={() => setArticlesCount((prev) => prev + 3)}
                >
                    Show more
                </button>
            </div>

            {/* Users */}
        </aside>
    );
};

export default Widgets;
