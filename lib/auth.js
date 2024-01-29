import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "نام کاربری",
          type: "text",
          placeholder: "نام کاربری",
        },
        phoneNumber: {
          label: "شماره تماس",
          type: "number",
          placeholder: "شماره تماس",
        },
        password: { label: "رمز ورود", type: "password" },
      },

      async authorize(credentials, req) {
        const { username, phoneNumber, password } = credentials;

        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            phoneNumber,
            password,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export function auth(...args) {
  return getServerSession(...args, options);
}
