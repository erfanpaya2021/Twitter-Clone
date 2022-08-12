import Header from "./Header";
import Input from "./Input";

const Feed = () => {
    return (
        <section className="sm:ml-[74px] sm:flex-grow xl:ml-[370px] xl:min-w-[576px] border-l border-r border-gray-200 w-full max-w-xl">
            {/* Header */}
            <Header />

            {/* Input */}
            <Input />
        </section>
    );
};

export default Feed;
