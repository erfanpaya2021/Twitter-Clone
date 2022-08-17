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

const Comment = ({ comment, originalPostId }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [isOpen, setIsOpen] = useRecoilState(modalAtom);
    const [postId, setPostId] = useRecoilState(postIdAtom);

    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const likeCommentHandler = async () => {
        if (status === "authenticated") {
            if (hasLiked) {
                await deleteDoc(
                    doc(
                        db,
                        "posts",
                        originalPostId,
                        "comments",
                        comment.id,
                        "likes",
                        session?.user?.uid,
                    ),
                );
            } else {
                await setDoc(
                    doc(
                        db,
                        "posts",
                        originalPostId,
                        "comments",
                        comment.id,
                        "likes",
                        session?.user?.uid,
                    ),
                    {
                        username: session.user.username,
                    },
                );
            }
        } else {
            signIn();
        }
    };

    const deleteCommentHandler = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            await deleteDoc(doc(db, "posts", originalPostId, "comments", comment.id));
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", originalPostId, "comments", comment.id, "likes"),
            (snapshot) => setLikes(snapshot.docs),
        );
    }, [originalPostId, comment.id]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
    }, [session?.user?.uid, likes]);

    return (
        <article className="flex space-x-3 p-4 border-b border-gray-200 pl-20">
            {/* Left side | Image */}
            <div>
                {comment?.data()?.userImage && (
                    <Image
                        src={comment?.data()?.userImage}
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
                        <h3 className=" font-bold hover:underline">{comment?.data()?.name}</h3>
                        <h4 className="text-sm text-gray-500">
                            @{comment?.data()?.username} -
                            <span className="hover:underline">
                                <Moment fromNow>{comment?.data()?.timestamp?.toDate()}</Moment>
                            </span>
                        </h4>
                    </div>
                    <DotsHorizontalIcon className="hover-effect w-10 h-10 p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
                {/* Post Body */}
                <div>
                    <p className="text-gray-800 text-sm mb-2">{comment?.data()?.comment}</p>
                </div>

                {/* Post Footer */}
                <div className="flex items-center justify-between pt-3">
                    {session?.user?.uid === comment?.data()?.uid && (
                        <TrashIcon
                            onClick={deleteCommentHandler}
                            className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100"
                        />
                    )}
                    <div className="flex items-center">
                        {hasLiked ? (
                            <HeartIconSolid
                                onClick={likeCommentHandler}
                                className="hover-effect w-10 h-10 p-2 text-red-500 hover:bg-red-100"
                            />
                        ) : (
                            <HeartIcon
                                onClick={likeCommentHandler}
                                className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-red-500 hover:bg-red-100"
                            />
                        )}
                        {likes.length > 0 && (
                            <span
                                className={`text-sm font-bold text-gray-500 select-none ${
                                    hasLiked && "text-red-500"
                                }`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>

                    <ShareIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="hover-effect w-10 h-10 p-2 text-gray-500 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </article>
    );
};

export default Comment;
