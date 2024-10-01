import {describe, it, expect, beforeEach} from 'vitest'
import { GetUserProfileService } from './getUserProfile'

import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-repository'
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from '@/errors/invalidCredentialsError'
import { ResourceDoesNotExistsError } from '@/errors/ResourceDoesNotExistsError'

let userRepository: InMemoryUserRepository
let getUserProfileService: GetUserProfileService

beforeEach(() => {
  userRepository = new InMemoryUserRepository()
  getUserProfileService = new GetUserProfileService(userRepository)
})

// in memory database - martin fowler
describe('Authenticate Service', () => {
  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password_hash: await bcrypt.hash('123456', 6)
    })

    const {user} = await getUserProfileService.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(createdUser.name)
  })

  it('should not be able to get user profile when user id does not exists', async () => {
    await userRepository.create({
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      password_hash: await bcrypt.hash('123456', 6)
    })

    await expect(() => getUserProfileService.execute({
      userId: 'id-does-not-exists'
    })).rejects.toBeInstanceOf(ResourceDoesNotExistsError)
  })
})
