import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer: Customer = new Customer("1", "John")
const address: Address = new Address("street", 1, "zip", "city")
customer.changeAddress(address)

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    };
}

describe('Test find customer use case', () => {
    it('should find a customer', async () => {
        const customerRepository: CustomerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository)

        const input = { id: "1" }
        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: "1",
            name: "John",
            address: {
                street: "street",
                city: "city",
                number: 1,
                zip: "zip"
            }
        })
    })

    it ('should exception customer not found', async () => {
        const customerRepository: CustomerRepository = MockRepository();
        customerRepository.find = jest.fn().mockImplementation(() => {
            throw new Error('Customer not found')
        })
        const useCase = new FindCustomerUseCase(customerRepository)

        const input = { id: "1" }

        await expect(() => useCase.execute(input)).rejects.toThrow('Customer not found')
    })
})