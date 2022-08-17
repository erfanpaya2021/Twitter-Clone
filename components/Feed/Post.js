import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import { modalAtom, postIdAtom } from "@/atom/modal-atom";

import Moment from "react-moment";

import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";

import {
    collection,
    db,
    doc,
    onSnapshot,
    setDoc,
    deleteDoc,
    deleteObject,
    ref,
    storage,
    deleteField,
} from "@/lib/firebase";

const Post = ({ post }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [isOpen, setIsOpen] = useRecoilState(modalAtom);
    const [postId, setPostId] = useRecoilState(postIdAtom);

    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const likePostHandler = async () => {
        if (status === "authenticated") {
            if (hasLiked) {
                await deleteDoc(doc(db, "posts", post.id, "likes", session?.user?.uid));
            } else {
                await setDoc(doc(db, "posts", post.id, "likes", session?.user?.uid), {
                    username: session.user.username,
                });
            }
        } else {
            signIn();
        }
    };

    const deletePostHandler = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await deleteDoc(doc(db, "posts", post.id));
            if (post?.data()?.postImage) {
                await deleteObject(ref(storage, `posts/${post.id}/image`));
            }
            router.push("/");
        }
    };

    const openModalHandler = () => {
        if (status === "authenticated") {
            setPostId(post.id);
            setIsOpen((prev) => !prev);
        } else {
            signIn();
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) =>
            setLikes(snapshot.docs),
        );
    }, [post.id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts", post.id, "comments"), (snapshot) =>
            setComments(snapshot.docs),
        );
    }, [post.id]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [session?.user?.uid, likes]);

    return (
        <article className="flex space-x-3 p-4 border-b border-gray-200 dark:border-slate-500">
            {/* Left side | Image */}
            <div>
                {post?.data()?.userImage && (
                    <Image
                        src={post?.data()?.userImage}
                        alt="User Image"
                        width="48"
                        height="48"
                        className="rounded-full cursor-pointer hover:brightness-95"
                    />
                )}
            </div>
            {/* Right side */}
            <div className="w-full ml-4">
                {/* Post Header */}
                <div className="flex items-center justify-between w-full p-2">
                    <div className="flex items-start flex-col sm:flex-row sm:items-end  space-x-1">
                        <h3 className=" font-bold hover:underline ">{post?.data()?.name}</h3>
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">
                            @{post?.data()?.username} -
                            <span className="hover:underline">
                                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                            </span>
                        </h4>
                    </div>
                    <DotsHorizontalIcon className="hover-effect w-10 h-10 p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
                {/* Post Body */}
                <div onClick={() => router.push(`/posts/${post.id}`)}>
                    <p className="text-gray-800 text-sm mb-2 dark:text-gray-400">
                        {post?.data()?.text}
                    </p>
                    {post?.data()?.postImage && (
                        <Image
                            src={post?.data()?.postImage}
                            alt="PostImage"
                            width="400"
                            height="300"
                            layout="responsive"
                            className="rounded-3xl"
                        />
                    )}
                </div>

                {/* Post Footer */}
                <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center">
                        <ChatIcon
                            onClick={openModalHandler}
                            className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100 dark:hover:text-sky-500 dark:hover:bg-sky-700"
                        />
                        {comments.length > 0 && (
                            <span className={`text-sm font-bold text-gray-500 select-none`}>
                                {comments.length}
                            </span>
                        )}
                    </div>
                    {session?.user?.uid === post?.data()?.id && (
                        <TrashIcon
                            onClick={deletePostHandler}
                            className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-400 dark:hover:text-red-700"
                        />
                    )}
                    <div className="flex items-center">
                        {hasLiked ? (
                            <HeartIconSolid
                                onClick={likePostHandler}
                                className="hover-effect w-10 h-10 p-2 text-red-500 hover:bg-red-100  dark:hover:bg-red-400 dark:hover:text-red-700"
                            />
                        ) : (
                            <HeartIcon
                                onClick={likePostHandler}
                                className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-400 dark:hover:text-red-700"
                            />
                        )}
                        {likes.length > 0 && (
                            <span
                                className={`text-sm font-bold text-gray-500 select-none ${
                                    hasLiked && "text-red-500 dark:text-red-700"
                                }`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>

                    <ShareIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100 dark:hover:text-sky-500 dark:hover:bg-sky-700" />
                    <ChartBarIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100 dark:hover:text-sky-500 dark:hover:bg-sky-700" />
                </div>
            </div>
        </article>
    );
};

export default Post;
