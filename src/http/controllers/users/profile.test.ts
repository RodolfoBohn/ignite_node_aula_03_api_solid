import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/createAndAuthenticateUser";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";


beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

describe('Controller:Profile (e2e)', () => {
  it('should return status code 200 when access profile', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const {token} = await createAndAuthenticateUser(app)

    const profileResponse = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)



    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(expect.objectContaining({
      email: userData.email
    }))
  })
})
