import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import News from "./News";
import SearchBar from "./SearchBar";
import User from "./User";

const Widgets = ({ news, users }) => {
    const [articlesCount, setArticlesCount] = useState(3);
    const [usersCount, setUsersCount] = useState(3);

    return (
        <aside className="hidden lg:block xl:w-[400px] ml-8 py-4 space-y-6">
            {/* Search */}
            <SearchBar />

            {/* News */}
            <div className="w-[90%] xl:[75%] rounded-xl bg-gray-100 text-gray-700 space-y-3">
                <h4 className="text-md  p-3 font-bold">What&apos;s Happening</h4>
                <AnimatePresence>
                    {news.slice(0, articlesCount).map((article) => (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <News article={article} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button
                    className=" p-3 text-blue-300 hover:text-blue-500"
                    onClick={() => setArticlesCount((prev) => prev + 3)}
                >
                    Show more
                </button>
            </div>

            {/* Users */}
            <div className="sticky top-16 w-[90%] xl:[75%] rounded-xl bg-gray-100 text-gray-700 space-y-3">
                <h4 className="text-md  p-3 font-bold">Who to follow</h4>
                <AnimatePresence>
                    {users.slice(0, usersCount).map((user) => (
                        <motion.div
                            key={user.login.uuid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <User user={user} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button
                    className=" p-3 text-blue-300 hover:text-blue-500"
                    onClick={() => setUsersCount((prev) => prev + 3)}
                >
                    Show more
                </button>
            </div>
        </aside>
    );
};

export default Widgets;
