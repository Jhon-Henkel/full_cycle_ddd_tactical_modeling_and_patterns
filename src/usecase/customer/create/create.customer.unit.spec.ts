import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "John",
    address: {
        street: "street",
        number: 1,
        zip: "zip",
        city: "city"
    }
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Test create customer use case', () => {
    it('should create a customer', async () => {
        const customerRepository = mockRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip
            }
        })
    })
})