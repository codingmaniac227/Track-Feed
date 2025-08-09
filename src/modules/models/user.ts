
export type UserRole = 'user' | 'admin'

export class User {
    id: string
    username: string
    passwordHash: string
    role: UserRole


    constructor (
        username: string,
        passwordHash: string,
        role: UserRole = 'user'
    ) {
        this.id = crypto.randomUUID()
        this.username = username
        this.passwordHash = passwordHash
        this.role = role
    }
}