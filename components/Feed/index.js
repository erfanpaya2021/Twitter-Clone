import { useEffect, useState } from "react";

import { onSnapshot, query, collection, db, orderBy } from "@/lib/firebase";

import Header from "./Header";
import Input from "./Input";
import Post from "./Post";

import { DUMMY_POSTS } from "@/constants/index";
import {} from "firebase/firestore";

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
            <Header />

            {/* Input */}
            <Input />

            {/* Posts */}
            <ul>
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </ul>
        </section>
    );
};

export default Feed;
