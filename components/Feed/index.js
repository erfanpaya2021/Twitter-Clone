import Header from "./Header";
import Input from "./Input";

import { DUMMY_POSTS } from "@/constants/index";
import Post from "./Post";

const Feed = () => {
    return (
        <section className="sm:ml-[74px] sm:flex-grow xl:ml-[370px] xl:min-w-[576px] border-l border-r border-gray-200 w-full max-w-xl">
            {/* Header */}
            <Header />

            {/* Input */}
            <Input />

            {/* Posts */}
            <ul>
                {DUMMY_POSTS.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </ul>
        </section>
    );
};

export default Feed;
