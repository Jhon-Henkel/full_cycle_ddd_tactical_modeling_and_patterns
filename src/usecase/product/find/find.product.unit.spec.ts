import ProductFactory from "../../../domain/product/factory/product.factory"
import FindProductUseCase from "./find.product.usecase"

const product = ProductFactory.create("a", "Product 1", 10)

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
}

describe('Test find product use case', () => {
    it('should find a product', async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository)

        const input = { id: "1" }
        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: "Product 1",
            price: 10
        })
    })

    it ('should exception product not found', async () => {
        const productRepository = MockRepository();
        productRepository.find = jest.fn().mockImplementation(() => {
            throw new Error('Product not found')
        })
        const useCase = new FindProductUseCase(productRepository)

        const input = { id: "1" }

        await expect(() => useCase.execute(input)).rejects.toThrow('Product not found')
    })
})