import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectProfile } from '_models/profile/projectProfile';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { PostService } from '_service/post/post.service';
import { SkillService } from '_service/skill/skill.service';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectEditComponent } from '../_forms/project-edit/project-edit.component';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-project-profile',
    templateUrl: 'project-profile.component.html',
    styleUrls: ['./project-profile.component.less'],
})
export class ProjectProfileComponent implements OnInit {
    expanded = false;
    sub: any;
    id: number;
    project: ProjectProfile;
    Arr = Array;

    constructor(
        private route: ActivatedRoute,
        private utils: UtilsService,
        private projectProfileService: ProjectProfileService,
        private postService: PostService,
        private skillService: SkillService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getProject(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProject(id: number): void {
        this.projectProfileService.getProject(id).subscribe(
            data => { this.project = data },
        );
    }

    joinProject():void {
        
    }

    openEditModal(): any {
        const modalRef = this.modalService.open(ProjectEditComponent);
        modalRef.componentInstance.projectProfile = this.project;
    }
}
