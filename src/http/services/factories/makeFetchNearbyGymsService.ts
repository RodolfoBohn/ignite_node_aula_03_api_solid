
import { PrismaGymsRepository } from '@/http/repositories/prisma/prismaGymsRepository'
import { FetchNearbyGymsService } from '../fetchNearbyGymsService'


export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new FetchNearbyGymsService(gymsRepository)

  return useCase
}