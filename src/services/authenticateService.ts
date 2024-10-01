import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/usersRepository";
import { InvalidCredentialsError } from "@/errors/invalidCredentialsError";
import { compare } from "bcryptjs";

interface IAuthenticateServiceRequest {
  email: string
  password: string
}

interface IAuthenticateServiceResponse{
  user: User
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({email, password}: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse> {

    const user = await this.userRepository.findByEmail(email)

    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if(!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}