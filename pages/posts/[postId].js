import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { collection, db, doc, onSnapshot } from "@/lib/firebase";

import { AnimatePresence, motion } from "framer-motion";

import Seo from "@/components/Seo";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import CommentModal from "@/components/CommentModal";
import Header from "@/components/Feed/Header";
import Post from "@/components/Feed/Post";
import Comment from "@/components/Comment";

const PostPage = ({ news, users }) => {
    const router = useRouter();
    const { postId: id } = router.query;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
    }, [id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
            setComments(snapshot.docs.sort((a, b) => b.data().timestamp - a.data().timestamp)),
        );
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

                    <AnimatePresence>
                        {post !== null && (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Post post={post} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {comments.length > 0 &&
                        comments.map((comment, index) => (
                            <Comment key={index} originalPostId={id} comment={comment} />
                        ))}
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
