
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchGymsService } from '../searchGymsService'


export function makeSearchGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsService(gymsRepository)

  return useCase
}