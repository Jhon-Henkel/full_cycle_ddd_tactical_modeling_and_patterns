import {IInputCreateCustomerDTO, IOutputCreateCustomerDTO} from "./create.customer.dto"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"

export default class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) {}

    async execute(input: IInputCreateCustomerDTO): Promise<IOutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city
            )
        )
        await this.customerRepository.create(customer)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        }
    }
}