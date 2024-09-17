import { prisma } from "@/lib/prisma"
import { Prisma, User } from "@prisma/client"
import {UsersRepository} from '../usersRepository'

export class PrismaUserRepository implements UsersRepository {
  async findByUserId(userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput){
    const user =   await prisma.user.create({data})

    return user
  }
}