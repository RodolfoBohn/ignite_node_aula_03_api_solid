import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { InvalidCredentialsError } from "@/errors/invalidCredentialsError"
import { makeAuthenticateService } from "../../../services/factories/makeAuthenticateService"

export async function authenticate(request: FastifyRequest, reply: FastifyReply)  {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()

    const {user} = await authenticateService.execute({email, password})

    const token = await reply.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await reply.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id, 
        expiresIn: '7d'
      }
    })

    return reply.status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/', 
        secure: true, 
        sameSite: true, 
        httpOnly: true
      })
      .send({
        token,
      })

  } catch(err) {
    if(err instanceof InvalidCredentialsError) {
      return reply.status(400).send({message: err.message})
    }

    throw err
  }
}