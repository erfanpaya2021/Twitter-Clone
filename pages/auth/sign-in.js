import { useEffect, useState } from "react";
import Image from "next/image";
import { getProviders } from "next-auth/react";

import Seo from "@/components/Head";

import { IMAGES } from "@/constants/index";

const SignIn = () => {
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <>
            <Seo title="Sign In" description={"Twitter clone sign in page"} />
            <main className="">
                <div className="flex flex-col justify-center items-center h-screen">
                    <Image src={IMAGES.TwitterLogo} alt="Twitter Logo" width="48" height="48" />
                    <p className="text-center italic my-10">
                        This app is created for learning purposes
                    </p>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                key={provider.id}
                                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))}
                </div>
            </main>
        </>
    );
};

export default SignIn;