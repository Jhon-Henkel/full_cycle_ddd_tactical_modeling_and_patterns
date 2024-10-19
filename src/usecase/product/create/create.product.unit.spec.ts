import CreateProductUseCase from "./create.product.usecase"

const input = {
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

describe('Test create product use case', () => {
    it('should create a product', async () => {
        const productRepository = mockRepository()
        const useCase = new CreateProductUseCase(productRepository)

        const output = await useCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it('should throw an error when name is missing', () => {
        const productRepository = mockRepository()
        const useCase = new CreateProductUseCase(productRepository)

        expect(async () => {
            await useCase.execute({
                ...input,
                name: ""
            })
        }).rejects.toThrow("Name is required")
    })
})