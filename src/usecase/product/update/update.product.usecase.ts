import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import Product from "../../../domain/product/entity/product"
import {IInputUpdateProduct, IOutputUpdateProduct} from "./update.product.dto"

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: IInputUpdateProduct): Promise<IOutputUpdateProduct> {
        const product = new Product(input.id, input.name, input.price);
        await this.productRepository.update(product);
        return {id: product.id, name: product.name, price: product.price}
    }
}