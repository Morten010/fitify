import CredentialsProvider from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcrypt"
import { db } from "@/src/db";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { users } from "@/src/db/schema";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "Password",
                }
            },
            async authorize(credentials) {
                // check to see if email and password is there
                if(!credentials?.email || !credentials?.password){
                    return null
                }
                //check if user exists
                const user = await db.query.users.findFirst({
                    where: eq(users.email, credentials.email)
                })
                
                if(user?.email !== credentials.email){
                    return null
                }

                //check if password matches
                const passwordMatch = await bcrypt.compare(credentials?.password, user?.password!)

                if(!passwordMatch){
                    return null
                }

                //return user object if everything is valid
                const {password: dontUse, ...restOfUser} = user;
                
                return restOfUser as any
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, session}){
            // console.log("jwt callback", {token, user, session});
            
            // pass in user id and adress to token
            if(user){
                return {
                    ...token,
                    id: user.id
                }
            }
            return token
        },
        async session({session, token, user}) {
            // console.log("session callback", {session, token, user});
            // pass in user id and address to session
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",

    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }