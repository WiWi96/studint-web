import { Address } from '../address';
import { ProfileName } from './profileName';
import { Course } from '../course';
import { Post } from '../post';

export class UniversityProfile {
    profileName: ProfileName;
    description: string;
    profiles: Map<string, string>;
    posts: Array<Post> = [];
    address: Address;
    type: string;
    courses: Array<Course> = [];
}
