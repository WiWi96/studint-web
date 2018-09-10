import { ProfileName } from "../profile/profileName";
import { Duration } from "../duration";

export class ProjectInfo {
    projectId: number;
    projectName: string;
    photo: string;
    company: ProfileName;
    status: string;
    level: string;
    startDate: Date;
    joiningDate: Date;
    duration: Duration;
}