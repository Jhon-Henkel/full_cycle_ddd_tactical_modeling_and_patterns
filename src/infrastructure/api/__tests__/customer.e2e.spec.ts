import { app, sequelize } from "../express"
import request from "supertest"

describe('End to end test customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const response = await request(app).post('/customer').send({
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Springfield",
                number: 123,
                zip: "62701"
            }
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Springfield",
                number: 123,
                zip: "62701"
            }
        })
    })

    it('should return 500 when an error occurs', async () => {
        const response = await request(app).post('/customer').send({name: "John Doe"})

        expect(response.status).toBe(500)
    })

    it('should list all customers', async () => {
        const response = await request(app).post('/customer').send({
            name: "John Doe",
            address: {
                street: "123 Main St",
                city: "Springfield",
                number: 123,
                zip: "62701"
            }
        })

        const response2 = await request(app).post('/customer').send({
            name: "Jane",
            address: {
                street: "456 Main St",
                city: "Springfield",
                number: 456,
                zip: "62702"
            }
        })

        expect(response.status).toBe(200)
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get('/customer').send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers).toEqual([
            {
                id: expect.any(String),
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Springfield",
                    number: 123,
                    zip: "62701"
                }
            },
            {
                id: expect.any(String),
                name: "Jane",
                address: {
                    street: "456 Main St",
                    city: "Springfield",
                    number: 456,
                    zip: "62702"
                }
            }
        ])
    })
})