import { ProfileName } from '../profile/profileName';
import { ProjectInfo } from '../info/projectInfo';

export class Team {
    id: number;
    projects?: Array<ProjectInfo> = [];
    name: string;
    leader?: ProfileName;
    members?: Array<ProfileName> = [];
}
