import Notification from "../notification/notification"

export default abstract class Entity {
    protected id: string
    protected notification: Notification

    protected constructor() {
        this.notification = new Notification()
    }

}