import { Post } from '../post';
import { ProfileName } from './profileName';
import { Skill } from '../skill/skill';
import { Language } from '../skill/language';
import { ExperienceInfo } from '../info/experienceInfo';
import { SocialMedia } from '../socialMedia';
import { ProjectInfo } from '../info/projectInfo';
import { StudyInfo } from '../info/studyInfo';
export class UserProfile {
    profileName: ProfileName;
    description: string;
    experienceInfos: Array<ExperienceInfo> = [];
    profiles: Array<SocialMedia> = [];
    status: string;
    projects: Array<ProjectInfo> = [];
    studiesInfos: Array<StudyInfo> = [];
    skills: Array<Skill> = [];
    languages: Array<Language> = [];
}
