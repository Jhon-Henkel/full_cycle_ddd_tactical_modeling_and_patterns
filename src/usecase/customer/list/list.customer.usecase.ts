import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import {IInputListCustomerDTO, IOutputListCustomerDTO} from "./list.customer.dto"
import Customer from "../../../domain/customer/entity/customer"

export default class ListCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) {}

    async execute(input: IInputListCustomerDTO): Promise<IOutputListCustomerDTO> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
    static toOutput(customers: Customer[]): IOutputListCustomerDTO {
        return {
            customers: customers.map((customer: Customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city
                }
            }))
        };
    }
}