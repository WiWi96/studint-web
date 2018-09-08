import { Course } from "../course";
import { ProfileName } from "../profile/profileName";

export class StudyInfo {
    university: ProfileName;
    course: Course;
    status: string;
    beginYear: Date;
    endYear: Date;
    yearOfStudies: number;
}