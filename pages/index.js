import Seo from "@/components/Head";

import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

export default function Home({ news, users }) {
    return (
        <>
            <Seo
                title="Twitter Clone"
                description={"Fantastic Twitter clone with next js and firebase "}
            />

            <main className="flex min-h-screen max-w-7xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}
                <Feed />

                {/* Widgets */}
                <Widgets news={news?.articles} users={users.results} />

                {/* Modal */}
            </main>
        </>
    );
}

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
