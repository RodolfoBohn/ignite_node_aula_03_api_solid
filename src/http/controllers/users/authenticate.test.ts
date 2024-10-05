import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";


beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

describe('Controller:Authenticate (e2e)', () => {
  it('should return status code 200 when user is created', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }
    await supertest(app.server).post('/users').send(userData)
    const response = await supertest(app.server).post('/sessions').send({
      email: userData.email,
      password: userData.password
    })



    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
