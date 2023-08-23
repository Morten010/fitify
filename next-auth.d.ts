
import { DefaultUser, User, UserRole } from "next-auth"
import "next-auth/jwt"
import { Users } from "./src/db/schema"

type UserID = string

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserId
        } & DefaultUser
    }
    
    interface User {
        id: user
    }
}