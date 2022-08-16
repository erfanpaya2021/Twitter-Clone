import { useEffect, useState } from "react";

import { onSnapshot, query, collection, db } from "@/lib/firebase";

import { AnimatePresence, motion } from "framer-motion";

import Header from "./Header";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        return onSnapshot(query(collection(db, "posts")), (snapshot) => {
            setPosts(snapshot.docs.sort((a, b) => b.data().timestamp - a.data().timestamp));
        });
    }, []);

    return (
        <section className="sm:ml-[74px] sm:flex-grow xl:ml-[370px] xl:min-w-[576px] border-l border-r border-gray-200 w-full max-w-xl">
            {/* Header */}
            <Header title="Home" />

            {/* Input */}
            <Input />

            {/* Posts */}
            <ul>
                <AnimatePresence>
                    {posts.map((post) => (
                        <motion.li
                            key={post.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Post post={post} />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </section>
    );
};

export default Feed;
