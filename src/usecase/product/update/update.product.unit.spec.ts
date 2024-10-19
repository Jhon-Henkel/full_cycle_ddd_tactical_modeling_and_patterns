import UpdateProductUseCase from "./update.product.usecase"

const input = {
    id: "id",
    name: "name",
    price: 1,
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    }
}

describe('Test update product use case', () => {
    it('should update a product', async () => {
        const productRepository = mockRepository()
        const useCase = new UpdateProductUseCase(productRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        })
    })
})