import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async findByUserId(userId: string): Promise<User | null> {
    const user = this.items.find(user => user.id === userId)

    if(!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.email === email)

    if(!user) {
      return null
    }

    return user
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      created_at: new Date(), 
      email: data.email, 
      id: randomUUID(), 
      name: data.name, 
      password_hash: data.password_hash
    }

    this.items.push(user)

    return user
  }
  
}