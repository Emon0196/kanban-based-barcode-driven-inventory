import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ Export this for server-side session access
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Simple hardcoded auth
        if (username === "admin" && password === "admin123") {
          return { id: 1, name: "Admin", role: "admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export the handler like before
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
