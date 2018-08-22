import { Address } from './../address';
import { ProfileName } from './profileName';
import { Post } from '../post';

export class CompanyProfile {
    profileName: ProfileName;
    description: string;
    profiles: Map<string, string>;
    posts: Array<Post> = [];
    address: Address;
    type: string;
    projects: Array<ProfileName> = [];
}
