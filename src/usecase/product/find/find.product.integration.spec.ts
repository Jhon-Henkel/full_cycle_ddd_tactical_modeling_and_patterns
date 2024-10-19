import {Sequelize} from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import FindProductUseCase from "./find.product.usecase"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"

describe('Test find product use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a product', async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository)

        const product = ProductFactory.create("a", "Product 1", 10)
        await productRepository.create(new Product(product.id, product.name, product.price))

        const input = { id: product.id }
        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price
        })
    })

    it ('should exception product not found', async () => {
        const productRepository = new ProductRepository();
        productRepository.find = jest.fn().mockImplementation(() => {
            throw new Error('Product not found')
        })
        const useCase = new FindProductUseCase(productRepository)

        const input = { id: "1" }

        await expect(() => useCase.execute(input)).rejects.toThrow('Product not found')
    })
})