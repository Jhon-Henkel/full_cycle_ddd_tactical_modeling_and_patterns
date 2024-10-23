export type NotificationError = {
    context: string
    message: string
}

export default class Notification {
    private errors: NotificationError[] = []

    addError(error: any) {
        this.errors.push(error)
    }

    messages(context?: string): string {
        let messages = ""
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                messages += `${error.context}: ${error.message},`
            }
        })
        return messages
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }
}