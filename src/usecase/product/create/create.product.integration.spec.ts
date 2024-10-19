import {Sequelize} from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import CreateProductUseCase from "./create.product.usecase"

describe("Product repository test", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository)

        await useCase.execute({ name: "test name", price: 10.55 })

        const productModel = await ProductModel.findOne({ where: { name: "test name" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: expect.any(String),
            name: "test name",
            price: 10.55
        });
    })
})