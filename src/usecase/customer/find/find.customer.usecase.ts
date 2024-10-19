import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import {IInputFindCustomerDTO, IOutputFindCustomerDTO} from "./find.customer.dto"

export default class FindCustomerUseCase {
    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: IInputFindCustomerDTO): Promise<IOutputFindCustomerDTO> {
        const customer = await this.repository.find(input.id)
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
    }
}