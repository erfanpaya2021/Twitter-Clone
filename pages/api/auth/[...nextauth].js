import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            // clientId: process.env.GOOGLE_CLIENT_ID,
            clientId: "814774980515-06q2th9eesn2rmhguse7ipafi5b92vdd.apps.googleusercontent.com",
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientSecret: "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",
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/auth/sign-in",
    },
});
