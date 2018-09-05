import { Address } from './../address';
import { ProfileName } from './profileName';
import { Course } from '../course';
import { SocialMedia } from '../socialMedia';
import { ProjectInfo } from '../info/projectInfo';

export class UniversityProfile {
    profileName: ProfileName;
    description: string;
    profiles: Array<SocialMedia> = [];
    address: Address;
    type: string;
    courses: Array<Course> = [];
    projects: Array<ProjectInfo> = [];
}
