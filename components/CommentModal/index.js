import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalAtom, postIdAtom } from "@/atom/modal-atom";

import ReactModal from "react-modal";
import Moment from "react-moment";

import { EmojiHappyIcon, XIcon } from "@heroicons/react/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { addDoc, collection, db, doc, onSnapshot, serverTimestamp } from "@/lib/firebase";

const CommentModal = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [isOpen, setIsOpen] = useRecoilState(modalAtom);
    const [postId, setPostId] = useRecoilState(postIdAtom);

    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const [emojiPicker, setEmojiPicker] = useState(false);

    const addCommentHandler = async () => {
        setIsLoading(true);
        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: input,
            uid: session?.user?.uid,
            name: session?.user?.name,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        });

        setIsOpen(false);
        setInput("");
        setIsLoading(false);
        router.push(`/posts/${postId}`);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "posts", postId), (snapshot) =>
            setPost(snapshot.data()),
        );
    }, [postId]);

    useEffect(() => {
        ReactModal.setAppElement("body");
    }, []);

    return (
        <>
            <ReactModal
                className="z-[100] absolute top-24 left-[50%] translate-x-[-50%] max-w-lg w-[90%] h-80 bg-white border-2 border-gray-200 rounded-xl shadow-md focus:outline-none"
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                    overlay: {
                        zIndex: 51,
                    },
                }}
            >
                <div className="p-2">
                    <div className="border-b border-gray-200 pb-2">
                        <XIcon
                            onClick={() => setIsOpen(false)}
                            className="hover-effect w-10 h-10 p-2"
                        />
                    </div>
                </div>

                <div className="flex items-center p-2 space-x-4  relative">
                    <span className="w-0.5 h-full absolute z-[-1] left-8 top-11 bg-gray-200" />
                    {post?.userImage && (
                        <Image
                            src={post?.userImage}
                            alt="User Image"
                            width="48"
                            height="48"
                            className="rounded-full cursor-pointer hover:brightness-95"
                        />
                    )}

                    <div className="flex items-start flex-col space-x-1">
                        <div className="flex flex-col sm:flex-row">
                            <h3 className=" font-bold hover:underline">{post?.name}</h3>
                            <h4 className="text-sm text-gray-500">
                                @{post?.username} -
                                <span className="hover:underline">
                                    <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                                </span>
                            </h4>
                        </div>
                        <p className="text-gray-600">{post?.text}</p>
                    </div>
                </div>

                {/* Input */}
                <div className="flex items-center">
                    <div className="p-2">
                        <Image
                            src={session?.user?.image}
                            alt="User Image"
                            width="48"
                            height="48"
                            className="rounded-full cursor-pointer hover:brightness-95"
                        />
                    </div>
                    <div className="w-[90%] flex space-x-3 p-4">
                        <div className="w-full divide-y divide-gray-200">
                            <div>
                                <textarea
                                    className="w-full border-none tracking-wide h-12 text-gray-700 focus:ring-0 placeholder:text-gray-500 resize-none"
                                    placeholder="Tweet your reply"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex space-x-0">
                                    <div className="relative">
                                        <EmojiHappyIcon
                                            onClick={() => setEmojiPicker((prev) => !prev)}
                                            className="relative  w-10 h-10 p-2 hover-effect text-sky-500 hover:text-sky-600 hover:bg-sky-100 "
                                        />
                                        {emojiPicker && (
                                            <div className="absolute -left-20 z-[40] shadow-md">
                                                <Picker
                                                    data={data}
                                                    onEmojiSelect={addEmojiToInput}
                                                    emojiSize={20}
                                                    emojiButtonSize={28}
                                                    theme="light"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    disabled={!input.trim() || isLoading}
                                    onClick={addCommentHandler}
                                    className="px-4 py-1.5 rounded-full font-bold shadow-md bg-blue-500 text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    );
};

{
    /*  */
}

export default CommentModal;
