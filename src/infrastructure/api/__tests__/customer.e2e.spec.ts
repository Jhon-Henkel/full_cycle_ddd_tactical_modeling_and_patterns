import { app, sequelize } from "../express"
import request from "supertest"

describe('End to end test customer', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterEach(async () => {
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
})