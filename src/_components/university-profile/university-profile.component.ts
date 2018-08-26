import { Component, OnInit } from '@angular/core';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfile } from '_models/profile/universityProfile';

@Component({
    selector: 'app-university-profile',
    templateUrl: 'university-profile.component.html',
    styleUrls: ['./university-profile.component.less'],
})
export class UniversityProfileComponent implements OnInit {
    expanded = false;
    university: UniversityProfile;

    constructor() {
        this.university = {
            profileName: {
                id: 1,
                name: 'Silesian University of Technology',
                // tslint:disable-next-line:max-line-length
                photo: 'https://www.polsl.pl/logo/PublishingImages/Politechnika_Sl_logo_pl/pl/kolor/politechnika_sl_logo_pion_inwersja_pl_rgb.png'
            },
            // tslint:disable-next-line:max-line-length
            description: '<p>The Silesian University of Technology, a higher education institution with over 70 years of tradition in operating under various social and economic conditions, is a renowned technical university, recognized both in the scientific and research community, as well as in the area of higher education.</p><p>The main objective of our university is to train highly skilled engineering staff from the modern industry and to conduct innovative research. New ideas and solutions, born at the Silesian University of Technology, enable multilateral scientific cooperation in many areas of relevance to the economy, making the SUT an active player with regards to innovation and new technologies, required by the knowledge-based economy.</p>',
            profiles: new Map(),
            posts: [
                {
                    id: 1,
                    author: {
                        id: 1,
                        name: 'PolSl',
                        // tslint:disable-next-line:max-line-length
                        photo: 'https://www.polsl.pl/logo/PublishingImages/Politechnika_Sl_logo_pl/pl/kolor/politechnika_sl_logo_pion_inwersja_pl_rgb.png',
                    },
                    publishedDate: new Date(2018, 8, 26, 17, 0),
                    post: 'We are recruiting!'
                },
                {
                    id: 1,
                author: {
                    id: 1,
                    name: 'PolSl',
                    // tslint:disable-next-line:max-line-length
                    photo: 'https://www.polsl.pl/logo/PublishingImages/Politechnika_Sl_logo_pl/pl/kolor/politechnika_sl_logo_pion_inwersja_pl_rgb.png',
                },
                publishedDate: new Date(2018, 7, 10, 9, 0),
                post: 'Happy holidays for all Students!'
                }
            ],
            address: {
                town: 'Gliwice',
                postCode: '44-100',
                street: 'Akademicka',
                country: 'Poland',
                houseNo: 2,
            },
            type: 'University of technology',
            courses: [
                {
                    id: 1,
                    name: 'Computer Science'
                },
                {
                    id: 2,
                    name: 'Architecture'
                },
                {
                    id: 3,
                    name: 'Building'
                },
                {
                    id: 4,
                    name: 'Chemistry'
                },
                {
                    id: 5,
                    name: 'Economics'
                },
                {
                    id: 6,
                    name: 'Geology'
                },
                {
                    id: 7,
                    name: 'Mathematics'
                },
                {
                    id: 8,
                    name: 'Medical Technology'
                },
            ],
        }
    }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }
}
