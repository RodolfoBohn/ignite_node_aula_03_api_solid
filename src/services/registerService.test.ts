import {describe, it, expect, beforeEach} from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'

let userRepository: InMemoryUserRepository
let registerService: RegisterService

beforeEach(() => {
  userRepository = new InMemoryUserRepository()
  registerService = new RegisterService(userRepository)
})


// in memory database - martin fowler
describe('Register Service', () => {
  it('should be able to register user', async () => {
    const {user} = await registerService.execute({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password: '123456'
    })


    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash password', async () => {
    const password = '123456'

    const {user} = await registerService.execute({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password: password
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register twice with same e-mail', async () => {
    const email = 'johndoe@example.com'

    await registerService.execute({
      name: 'John Doe', 
      email: email, 
      password: '123456'
    })

    await expect(() => registerService.execute({
      name: 'John Doe', 
      email: email, 
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
