import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/usersRepository";
import { InvalidCredentialsError } from "@/errors/invalidCredentialsError";
import { compare } from "bcryptjs";
import { ResourceDoesNotExistsError } from "@/errors/ResourceDoesNotExistsError";

interface IGetUserProfileServiceRequest {
  userId: string
}

interface IGetUserProfileServiceResponse{
  user: User
}

export class GetUserProfileService {
  constructor(private userRepository: UsersRepository) {}

  async execute({userId}: IGetUserProfileServiceRequest): Promise<IGetUserProfileServiceResponse> {

    const user = await this.userRepository.findByUserId(userId)

    if(!user) {
      throw new ResourceDoesNotExistsError()
    }

    return {
      user
    }
  }
}