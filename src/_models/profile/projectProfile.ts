import { ProfileName } from './profileName';
import { Skill } from '../skill/skill';
import { Team } from '../team/team';
import { Duration } from '../duration';

export class ProjectProfile {
    profileName: ProfileName;
    name: string;
    company: ProfileName;
    description: string;
    technologies: Array<Skill> = [];
    type: string;
    level: string;
    participants: Array<ProfileName> = [];
    teams: Array<Team> = [];
    participationStatus: string;
    startDate: Date;
    joiningDate: Date;
    duration: Duration;
    status: string;
}
