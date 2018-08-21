import { ProfileName } from '../profile/profileName';

export class Team {
    id: number;
    projectId: number;
    name: string;
    leader: ProfileName;
    members: Array<ProfileName> = [];
}
