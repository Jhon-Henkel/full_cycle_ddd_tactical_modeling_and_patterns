import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"

const customerOne = CustomerFactory.createWithAddress("John", new Address("street 1", 1, "zip 1", "city 1"))
const customerTwo = CustomerFactory.createWithAddress("Jane", new Address("street 2", 2, "zip 2", "city 2"))

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo]))
    }
}

describe('Test list customer use case', () => {
    it('should list all customers', async () => {
        const customerRepository = mockRepository()
        const useCase = new ListCustomerUseCase(customerRepository)

        const output = await useCase.execute({})

        expect(output.customers.length).toBe(2)
        expect(output.customers).toEqual([
            {
                id: customerOne.id,
                name: customerOne.name,
                address: {
                    street: customerOne.Address.street,
                    number: customerOne.Address.number,
                    zip: customerOne.Address.zip,
                    city: customerOne.Address.city
                }
            },
            {
                id: customerTwo.id,
                name: customerTwo.name,
                address: {
                    street: customerTwo.Address.street,
                    number: customerTwo.Address.number,
                    zip: customerTwo.Address.zip,
                    city: customerTwo.Address.city
                }
            }
        ])
    })
})