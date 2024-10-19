import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress("John", new Address("street", 1, "zip", "city"))
const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street Updated",
        number: 1234,
        zip: "zip Updated",
        city: "city Updated"
    }
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn()
    }
}

describe('Test update customer use case', () => {
    it('should update a customer', async () => {
        const customerRepository = mockRepository()
        const useCase = new UpdateCustomerUseCase(customerRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual(input)
    })
})