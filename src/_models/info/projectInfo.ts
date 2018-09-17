import { ProfileName } from "../profile/profileName";
import { Duration } from "../duration";
import { ProjectStatus } from "_enums/projectStatus";
import { ProjectLevel } from "_enums/projectLevel";

export class ProjectInfo {
    projectId: number;
    projectName: string;
    photo?: string;
    company: ProfileName;
    status?: ProjectStatus;
    level?: ProjectLevel;
    startDate?: Date;
    joiningDate?: Date;
    duration?: Duration;
}