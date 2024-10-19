export interface IInputCreateCustomerDTO {
    name: string
    address: {
        street: string
        number: number
        zip: string
        city: string
    }
}

export interface IOutputCreateCustomerDTO {
    id: string
    name: string
    address: {
        street: string
        number: number
        zip: string
        city: string
    }
}