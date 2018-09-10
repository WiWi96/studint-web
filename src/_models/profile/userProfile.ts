import { Post } from '../post';
import { ProfileName } from './profileName';
import { Skill } from '../skill/skill';
import { Language } from '../skill/language';
export class UserProfile {
    profileName: ProfileName;
    description: string;
    experienceInfos: Array<Object>;
    profiles: Map<string, string>;
    posts: Array<Post> = [];
    status: string;
    projects: Array<ProfileName> = [];
    studiesInfos: Array<Object>;
    skills: Array<Skill> = [];
    languages: Array<Language> = [];
}
