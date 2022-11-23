import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // return (
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */

        // using axios is recommended but optional. You can use native fetch() or other libraries.
        try {
          const { user, jwt } =
            (await axios
              .post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/local`, {
                identifier:
                  credentials.email /* identifier can be the username, instead of the email */,
                password: credentials.password,
              })
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                console.log(error.response);
                throw new Error(error.response.data.message);
              })) || null;

          return { jwt, ...user };
        } catch (error) {
          console.warn(error);
          // Sign In Fail
          // return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();

        if (data.userid == null) {
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${data.user.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userid: `${data.user.provider}_${
                  data.user.username
                }_${Math.random().toString(6)}`,
                social: data.user.provider,
                socialPicture: profile?.picture,
              }),
            }
          );
        }

        token.jwt = data.jwt;
        token.id = data.user.id;
        token.username = user.username; /* ### */
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.username = token.username; /* ### */

      return Promise.resolve(session);
    },
  },
});
