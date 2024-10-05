import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";


beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

describe('Controller:Register (e2e)', () => {
  it('should return status code 201 when user is created', async () => {
    const response = await supertest(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
