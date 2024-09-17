import { CheckInsRepository } from '@/http/repositories/checkInsRepository'
import { CheckIn } from '@prisma/client'
import { GymsRepository } from '../repositories/gymsRepository'
import {ResourceDoesNotExistsError} from '@/errors/ResourceDoesNotExistsError'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'
import { MaxNumberOfCheckInsError } from '@/errors/maxNumberOfCheckInsError'
import { MaxDistanceError } from '@/errors/maxDistanceError'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository, private gymsRepository: GymsRepository) {}

  async execute({
    userId,
    gymId,
    userLatitude, 
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceDoesNotExistsError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}