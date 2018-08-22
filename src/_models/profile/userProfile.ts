import { Post } from './../post';
import { ProfileName } from './profileName';
import { Skill } from '../skill/skill';
import { Language } from '../skill/language';
export class UserProfile {
    profileName: ProfileName;
    description: string;
    profiles: Map<string, string>;
    posts: Array<Post> = [];
    status: string;
    projects: Array<ProfileName> = [];
    universities: Array<ProfileName> = [];
    skills: Array<Skill> = [];
    languages: Array<Language> = [];
}
