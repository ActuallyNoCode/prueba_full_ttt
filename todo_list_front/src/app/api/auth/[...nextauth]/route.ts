import { config } from "@/config";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};
          if (!email || !password) {
            console.log("Missing credentials");
            return null;
          }

          const res = await axios.post(
            `${config.API.BASE_URL}/auth/login`,
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.status === 401) {
            console.log("Unauthorized", res);
            return null;
          }

          return res.data;
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;
      return session;
    },
  },

  pages: {
    signIn: "/?mode=login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
