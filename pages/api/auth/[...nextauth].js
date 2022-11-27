import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET_KEY,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (profile) {
        token.uid = profile.login;
      }
      //여기서 token.sub 백엔드에 주면 될듯?
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
