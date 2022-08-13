import Head from "next/head";

const Seo = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
};

export default Seo;
