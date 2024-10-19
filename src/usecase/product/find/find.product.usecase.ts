import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import {IInputFindProductDTO, IOutputFindProductDTO} from "./find.product.dto"

export default class FindProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: IInputFindProductDTO): Promise<IOutputFindProductDTO> {
        const product = await this.repository.find(input.id)
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}