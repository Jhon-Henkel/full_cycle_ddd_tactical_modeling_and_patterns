import Address from "../value-object/address"
import CustomerAddressChangedEvent from "../event/customer-address-changed.event"
import EnviaConsoleLogHandler from "../event/handler/EnviaConsoleLogHandler.handler"
import EventDispatcher from "../../@shared/event/event-dispatcher"
import Entity from "../../@shared/entity/entity.abstract"

export default class Customer extends Entity {
    private _name: string = ""
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0

    constructor(id: string, name: string) {
        super()
        this.id = id
        this._name = name
        this.validate()
        if (this.notification.hasErrors()) {
            throw new Error(this.notification.messages())
        }
    }

    get name(): string {
        return this._name
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    validate() {
        if (this.id.length === 0) {
            this.notification.addError({ context: "Customer", message: "Id is required" })
        }
        if (this._name.length === 0) {
            this.notification.addError({ context: "Customer", message: "Name is required" })
        }
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    get Address(): Address {
        return this._address
    }

    changeAddress(address: Address) {
        this._address = address
        const eventDispatcher = new EventDispatcher()
        eventDispatcher.register("CustomerAddressChangedEvent", new EnviaConsoleLogHandler())
        eventDispatcher.notify(new CustomerAddressChangedEvent(this))
    }

    isActive(): boolean {
        return this._active
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    set Address(address: Address) {
        this._address = address
    }
}
