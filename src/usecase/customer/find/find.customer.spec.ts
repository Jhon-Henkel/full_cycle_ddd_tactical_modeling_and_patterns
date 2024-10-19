import {Sequelize} from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

describe('Test find customer use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => {
        const customerRepository: CustomerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository)

        const customer: Customer = new Customer("1", "John")
        const address: Address = new Address("street", 1, "zip", "city")
        customer.changeAddress(address)
        await customerRepository.create(customer)

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
})