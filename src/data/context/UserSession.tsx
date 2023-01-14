export type UserType = 'USER' | 'MANAGER' | 'ADMIN'

export default interface UserSession {
    usertype: UserType
    token: string
}