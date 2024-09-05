import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import db from "@/lib/postgres";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        let currentUser = null

        const result = await db.query("SELECT * FROM users WHERE email = $1", [credentials.email])

        if (result.rows.length > 0) {
          const user = result.rows[0];
          const hashedPassword = user.password;

          try {
            const isValidPassword = await bcrypt.compare(credentials.password, hashedPassword);

            if (isValidPassword) {
              const { password, ...userWithoutPassword } = user;
              currentUser = userWithoutPassword;
            } else {
              return null;
            }
          } catch (error) {
            return null;
          }
        } else {
          if (!currentUser) {
            throw new Error("User with that email not found.")
          }
        }

        return currentUser;

      }
    }),
  ],
  pages: {
    error: "/login"
  }

})