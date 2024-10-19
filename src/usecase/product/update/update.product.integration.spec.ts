import {Sequelize} from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase"

describe("Update product integration test", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 1);
        await productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);
        const output = await useCase.execute({
            id: product.id,
            name: "Product 2",
            price: 2
        });

        expect(output).toEqual({
            id: product.id,
            name: "Product 2",
            price: 2
        });
    });
})