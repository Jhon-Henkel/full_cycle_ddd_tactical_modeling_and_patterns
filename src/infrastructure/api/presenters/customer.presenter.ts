import {toXML} from "jstoxml"
import {IOutputListCustomerDTO} from "../../../usecase/customer/list/list.customer.dto"

export default class CustomerPresenter {
    static listXML(data: IOutputListCustomerDTO): string {
        const xmlOptions = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        }

        return toXML({
            customers: {
                customer: data.customers.map(customer => {
                    return {
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            city: customer.address.city,
                            number: customer.address.number,
                            zip: customer.address.zip
                        }
                    }
                })
            }
        }, xmlOptions)
    }
}