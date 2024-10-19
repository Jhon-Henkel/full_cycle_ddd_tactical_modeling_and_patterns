type Product = {
    id: string;
    name: string;
    price: number;
}

export interface IInputListProduct {}

export interface IOutputListProduct {
  products: Product[];
}