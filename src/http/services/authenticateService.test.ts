import {describe, it, expect, beforeEach} from 'vitest'
import { AuthenticateService } from './authenticateService'

import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-repository'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/invalidCredentialsError'

let userRepository: InMemoryUserRepository
let authenticateService: AuthenticateService

beforeEach(() => {
  userRepository = new InMemoryUserRepository()
  authenticateService = new AuthenticateService(userRepository)
})

// in memory database - martin fowler
describe('Authenticate Service', () => {
  it('should be able to authenticate user', async () => {
    await userRepository.create({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password_hash: await bcrypt.hash('123456', 6)
    })

    const {user} = await authenticateService.execute({
      email: 'johndoe@example.com', 
      password: '123456'
    })


    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate when user dont exists', async () => {
    expect(() => authenticateService.execute({
      email: 'johndoe@example.com', 
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await userRepository.create({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password_hash: await bcrypt.hash('123456', 6)
    })

    await expect(() => authenticateService.execute({
      email: 'johndoe2@example.com', 
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password_hash: await bcrypt.hash('123456', 6)
    })

    await expect(() => authenticateService.execute({
      email: 'johndoe@example.com', 
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
