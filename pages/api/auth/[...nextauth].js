import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET_KEY,
      /* async authorize(credentials, req) {
        if (user) {
          return user;
        }
        return null;
      }, */
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
