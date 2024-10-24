import ProductInterface from "./product.interface"
import Entity from "../../@shared/entity/entity.abstract"
import NotificationError from "../../@shared/notification/notification.error"
import ProductBValidatorFactory from "../factory/productb.validator.factory"

export default class ProductB extends Entity implements ProductInterface {
    private _name: string
    private _price: number

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id
        this._name = name
        this._price = price
        ProductBValidatorFactory.create().validate(this)
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price * 2
    }

    changeName(name: string): void {
        this._name = name
        ProductBValidatorFactory.create().validate(this)
    }

    changePrice(price: number): void {
        this._price = price
        ProductBValidatorFactory.create().validate(this)
    }
}
