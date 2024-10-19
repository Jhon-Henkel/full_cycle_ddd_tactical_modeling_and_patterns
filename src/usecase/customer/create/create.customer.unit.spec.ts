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

    it('should throw an error when name is missing', () => {
        const customerRepository = mockRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)

        expect(async () => {
            await useCase.execute({
                ...input,
                name: ""
            })
        }).rejects.toThrow("Name is required")
    })

    it('should throw an error when street is missing', () => {
        const customerRepository = mockRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)

        expect(async () => {
            await useCase.execute({
                ...input,
                address: {
                    ...input.address,
                    street: ""
                }
            })
        }).rejects.toThrow("Street is required")
    })
})