import {Sequelize} from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductFactory from "../../../domain/product/factory/product.factory"
import Product from "../../../domain/product/entity/product"
import ListProductUseCase from "./list.product.usecase"

describe("Product list integration test", () => {
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

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const productOne = ProductFactory.create("a", "Product 1", 10);
        const productTwo = ProductFactory.create("a", "Product 2", 20);

        await productRepository.create(productOne as Product);
        await productRepository.create(productTwo as Product);

        const useCase = new ListProductUseCase(productRepository);
        const products = await useCase.execute({});

        expect(products.products).toEqual([
            {
                id: productOne.id,
                name: productOne.name,
                price: productOne.price
            },
            {
                id: productTwo.id,
                name: productTwo.name,
                price: productTwo.price
            }
        ])
    })
})