import { Address } from '../address';
import { ProfileName } from './profileName';
import { SocialMedia } from '../socialMedia';
import { ProjectInfo } from '../info/projectInfo';

export class CompanyProfile {
    profileName: ProfileName;
    description?: string;
    profiles?: Array<SocialMedia> = [];
    address?: Address;
    type?: string;
    projects?: Array<ProjectInfo> = [];
    isFollower?: boolean;
}
