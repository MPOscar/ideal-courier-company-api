export interface IUser {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}