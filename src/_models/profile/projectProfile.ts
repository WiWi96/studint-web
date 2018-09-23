import { ProfileName } from './profileName';
import { Skill } from '../skill/skill';
import { Team } from '../team/team';
import { Duration } from '../duration';
import { ProjectStatus } from '_enums/projectStatus';
import { ProjectLevel } from '_enums/projectLevel';
import { ParticipationStatus } from '_enums/participationStatus';

export class ProjectProfile {
    id: number;
    name?: string;
    company?: ProfileName;
    description?: string;
    technologies?: Array<Skill> = [];
    type?: string;
    level?: ProjectLevel;
    participants?: Array<ProfileName> = [];
    teams?: Array<Team> = [];
    participationStatus?: ParticipationStatus;
    startDate?: Date;
    joiningDate?: Date;
    duration?: Duration;
    status?: ProjectStatus;
}
