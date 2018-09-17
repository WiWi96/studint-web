import { UserType } from "_enums/userType";

export class ProfileName {
    id: number;
    name?: string;
    photo?: string;
    backgroundPhoto?: string;
    type?: UserType;
}
