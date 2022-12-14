import Image from "next/image";
import { useState, useRef } from "react";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";

import { useSession } from "next-auth/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
    db,
    collection,
    doc,
    addDoc,
    updateDoc,
    serverTimestamp,
    ref,
    storage,
    uploadString,
    getDownloadURL,
} from "@/lib/firebase";

const Input = () => {
    const filePickerRef = useRef(null);

    const { data: session, status } = useSession();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emojiPicker, setEmojiPicker] = useState(false);

    const createPostHandler = async () => {
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            name: session.user.name,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadUrl = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    postImage: downloadUrl,
                });
            });
        }

        await setInput("");
        await setSelectedFile(null);
        await setLoading(false);
    };

    const addImageToPostHandler = async (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const addEmojiToInput = (data) => {
        setEmojiPicker(false);
        setInput((prev) => prev + data.native);
    };

    return (
        <>
            {status === "authenticated" && (
                <div className="flex space-x-3 p-4 border-b border-gray-200 dark:border-slate-500">
                    <div>
                        <Image
                            src={session.user?.image}
                            alt="User Image"
                            width="48"
                            height="48"
                            className="rounded-full cursor-pointer hover:brightness-95"
                        />
                    </div>
                    <div className="w-full divide-y divide-gray-200 dark:divide-slate-500">
                        <div>
                            <textarea
                                className="w-full border-none tracking-wide min-h-[56px] text-white focus:ring-0 placeholder:text-gray-500 dark:bg-slate-700 dark:text-slate-300 dark:placeholder:text-slate-300"
                                rows="2"
                                placeholder="What's happening?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                            ></textarea>
                        </div>
                        {selectedFile && (
                            <div className="relative">
                                <XIcon
                                    onClick={() => setSelectedFile(null)}
                                    className="absolute z-10 top-2 left-2 w-8 h-8 p-1 text-black bg-white/50 rounded-full cursor-pointer hover:brightness-95 hover:text-red-500 hover:bg-red-200"
                                />
                                <Image
                                    className={`${
                                        loading && "animate-pulse"
                                    } object-cover rounded-3xl`}
                                    src={selectedFile}
                                    alt="selected file"
                                    width="400"
                                    height="300"
                                    layout="responsive"
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2">
                            {!loading && (
                                <>
                                    <div className="flex space-x-0">
                                        <div
                                            className=""
                                            onClick={() => filePickerRef.current.click()}
                                        >
                                            <PhotographIcon className="w-10 h-10 p-2 hover-effect text-sky-500 hover:text-sky-600 hover:bg-sky-100 dark:text-sky-600 dark:hover:text-sky-500 dark:hover:bg-sky-700" />
                                            <input
                                                type="file"
                                                hidden
                                                ref={filePickerRef}
                                                onChange={addImageToPostHandler}
                                            />
                                        </div>
                                        <div className="relative">
                                            <EmojiHappyIcon
                                                onClick={() => setEmojiPicker((prev) => !prev)}
                                                className="relative  w-10 h-10 p-2 hover-effect text-sky-500 hover:text-sky-600 hover:bg-sky-100 dark:text-sky-600 dark:hover:text-sky-500 dark:hover:bg-sky-700"
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
                                        disabled={!input.trim()}
                                        onClick={createPostHandler}
                                        className="px-4 py-1.5 rounded-full font-bold shadow-md bg-blue-500 text-white hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Tweet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Input;
