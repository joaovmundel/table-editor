import { IPermission } from "./permissions.interface";

export interface IUser {
    id: string;
    username: string;
    email: string;
    permissions: IPermission[];
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    roles: string[];
    lastLogin?: Date;
    profilePictureUrl?: string;
}