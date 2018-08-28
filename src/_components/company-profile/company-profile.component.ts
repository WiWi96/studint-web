import { Component, OnInit } from '@angular/core';
import { CompanyProfile } from '_models/profile/companyProfile';
import { ProfileName } from '_models/profile/profileName';


@Component({
    selector: 'app-company-profile',
    templateUrl: 'company-profile.component.html',
    styleUrls: ['./company-profile.component.less'],
})
export class CompanyProfileComponent implements OnInit {
    expanded = false;
    company: CompanyProfile;

    constructor() {
        this.company = {
            profileName: {
                id: 1,
                name: 'IBM',
                // tslint:disable-next-line:max-line-length
                photo: 'https://pbs.twimg.com/profile_images/956607218111188992/fLgNfCEG_400x400.jpg'
            },
            // tslint:disable-next-line:max-line-length
            description: '<p>At IBM, work is more than a job - it\'s a calling: To build. To design. To code. To consult. To think along with clients and sell. To make markets. To invent. To collaborate. Not just to do something better, but to attempt things you\'ve never thought possible. To lead in this new era of technology and solve some of the world\'s most challenging problems.</p><p>IBM is a leading cloud platform and cognitive solutions company. Restlessly reinventing since 1911, we are the largest technology and consulting employer in the world, with more than 380,000 employees serving clients in 170 countries. With Watson, the AI platform for business, powered by data, we are building industry-based solutions to real-world problems. For more than seven decades, IBM Research has defined the future of information technology with more than 3,000 researchers in 12 labs located across six continents. For more information, visit www.ibm.com. </p><p>This is IBM\'s official StudInt account and it follows IBM Social Computing Guidelines. We reserve the right to delete comments that are offensive or suggestive, personal attacks, anonymous, wildly off-topic, spam or advertisements. For more information regarding IBM’s social computing guidelines, visit http://ibm.co/1LRDq6F</p>',
            profiles: new Map(),
            posts: [
                {
                    id: 1,
                    author: {
                        id: 1,
                        name: 'IBM',
                        // tslint:disable-next-line:max-line-length
                        photo: 'https://pbs.twimg.com/profile_images/956607218111188992/fLgNfCEG_400x400.jpg',
                    },
                    publishedDate: new Date(2018, 8, 26, 17, 0),
                    post: 'We are hiring now in Katowice!'
                },
                {
                    id: 1,
                author: {
                    id: 1,
                    name: 'IBM',
                    // tslint:disable-next-line:max-line-length
                    photo: 'https://pbs.twimg.com/profile_images/956607218111188992/fLgNfCEG_400x400.jpg',
                },
                publishedDate: new Date(2018, 7, 10, 9, 0),
                post: 'Happy holidays for all Students!'
                }
            ],
            address: {
                town: 'Katowice',
                postCode: '40-028',
                street: 'Francuska',
                country: 'Poland',
                houseNo: '42',
            },
            type: 'Information Technology and Services',
            projects: [{
                id: 1,
                name: 'Easy Project',
                photo: ''
            },
            {
                id: 2,
                name: 'Intermediate Project',
                photo: ''
            },
            {
                id: 3,
                name: 'Know-How Project',
                photo: ''
            }],
        };
     }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }
}
