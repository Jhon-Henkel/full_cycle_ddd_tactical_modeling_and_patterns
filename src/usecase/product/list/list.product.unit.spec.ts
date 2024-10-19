import ProductFactory from "../../../domain/product/factory/product.factory"
import ListProductUseCase from "./list.product.usecase"

const productOne = ProductFactory.create("a", "Product 1", 10);
const productTwo = ProductFactory.create("a", "Product 2", 20);

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo]))
    }
}

describe('Test list product use case', () => {
    it('should list all products', async () => {
        const productRepository = mockRepository()
        const useCase = new ListProductUseCase(productRepository)

        const output = await useCase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products).toEqual([
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