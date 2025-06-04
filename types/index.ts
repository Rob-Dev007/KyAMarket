import { User } from "@prisma/client"

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified" | "hashedPassword"> & {
    createdAt : string,
    updateAt : string,
    emailVerified : string | null,
    role: 'USER' | 'ADMIN'; 
}

export interface IParams {
    orderId: string;
  }

