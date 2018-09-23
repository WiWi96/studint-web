import { ProfileName } from './profile/profileName';

export class Post {
    id: number;
    author?: ProfileName;
    publishedDate?: Date;
    post: string;
}
