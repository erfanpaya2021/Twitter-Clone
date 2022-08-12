import Image from "next/image";

const News = ({ article }) => {
    const { title, source, url, urlToImage } = article;

    return (
        <a className="" href={url} target="_blank" rel="noreferrer">
            <article className="flex space-between hover:bg-gray-200 p-3 transition-colors duration-200">
                <div className="w-[60%] space-y-2">
                    <h6 className="text-sm font-medium">{title.substr(0, 50)}...</h6>
                    <span className="text-gray-500 text-sm">{source.name}</span>
                </div>
                <div className="flex items-center justify-center w-[30%]">
                    <img
                        src={urlToImage}
                        alt={title}
                        width="70"
                        height="70"
                        className="rounded-xl"
                    />
                </div>
            </article>
        </a>
    );
};

export default News;
