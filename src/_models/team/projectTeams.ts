import { ProfileName } from "../profile/profileName";
import { Team } from "./team";
import { ProjectStatus } from "_enums/projectStatus";

export class ProjectTeams {
    id: number;
    name: string;
    unassigned: Array<ProfileName> = [];
    teams: Array<Team> = [];
    startDate: Date;
    joiningDate: Date;
    status: ProjectStatus;
}