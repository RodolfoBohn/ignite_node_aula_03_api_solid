import bcrypt from 'bcryptjs'
import { UsersRepository } from "../repositories/usersRepository"
import { UserAlreadyExistsError } from "@/errors/userAlreadyExistsError"

interface IRegisterServiceProps {
  name:string
  password: string
  email: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({email, name, password}:IRegisterServiceProps) {

    const userWithSameEmail = await await this.usersRepository.findByEmail(email)
  
    if(userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
    const passwordHash = await bcrypt.hash(password, 6)
  
  
    const user = await this.usersRepository.create({name, email, password_hash: passwordHash})

    return {
      user
    }
  } 
}

