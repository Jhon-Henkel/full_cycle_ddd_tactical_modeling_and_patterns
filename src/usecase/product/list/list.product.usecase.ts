import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import {IInputListProduct, IOutputListProduct} from "./list.product.dto"
import Product from "../../../domain/product/entity/product"

export default class ListProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: IInputListProduct): Promise<IOutputListProduct> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
    static toOutput(products: Product[]): IOutputListProduct {
        return {
            products: products.map((product: Product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}