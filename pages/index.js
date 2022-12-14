import Seo from "@/components/Seo";

import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import CommentModal from "@/components/CommentModal";

export default function Home({ news, users }) {
    return (
        <>
            <Seo
                title="Twitter Clone"
                description={"Fantastic Twitter clone with next js and firebase "}
            />

            <main className="flex min-h-screen max-w-screen-2xl mx-auto">
                {/* Sidebar */}
                <Sidebar />

                {/* Feed */}
                <Feed />

                {/* Widgets */}
                <Widgets news={news?.articles} users={users.results} />

                {/* Modal */}
                <CommentModal />
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
