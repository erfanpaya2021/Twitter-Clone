import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { db, doc, onSnapshot } from "@/lib/firebase";

import Seo from "@/components/Seo";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import CommentModal from "@/components/CommentModal";
import Header from "@/components/Feed/Header";
import Post from "@/components/Feed/Post";

const PostPage = ({ news, users }) => {
    const router = useRouter();
    const { postId: id } = router.query;

    const [post, setPost] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
    }, [id]);

    return (
        <>
            <Seo title="Tweet" description="awesome tweet" />

            <main className="flex min-h-screen max-w-screen-2xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}
                <section className="sm:ml-[74px] sm:flex-grow xl:ml-[370px] xl:min-w-[576px] border-l border-r border-gray-200 w-full max-w-xl">
                    <Header title="Tweet" />

                    {post !== null && <Post post={post} />}
                </section>

                {/* Widgets */}
                <Widgets news={news?.articles} users={users.results} />

                {/* Modal */}
                <CommentModal />
            </main>
        </>
    );
};

export default PostPage;

export const getServerSideProps = async (ctx) => {
    const newsResponse = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json",
    );
    const news = await newsResponse.json();

    const usersResponse = await fetch(
        "https://randomuser.me/api/?results=30&inc=name,login,picture",
    );
    const users = await usersResponse.json();

    return {
        props: {
            news,
            users,
        },
    };
};
