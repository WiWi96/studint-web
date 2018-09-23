import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/public_api';
import { PostService } from '_service/post/post.service';
import { Post } from '_models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.less']
})
export class NewPostComponent implements OnInit {

  postSubmitted: Boolean;
  newPostFormGroup: FormGroup;
  private editor;
  private postInfo: Post;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService) { }

  ngOnInit() {
    this.createForm();
    this.postInfo = new Post();
  }

  onEditorInit({ event, editor }: any) {
    this.editor = editor;
  }

  createForm() {
    this.newPostFormGroup = this.formBuilder.group({
      content: ['', [Validators.required]]
    });
  }

  onSubmitPost() {
    this.postSubmitted = true;

    if (this.newPostFormGroup.invalid) {
      return;
    }

    this.postInfo.post = this.editor.getContent();
    this.postInfo.publishedDate = new Date();

    this.postService.createPost(this.postInfo).subscribe(
      data => {
        console.log(data);
      },

      error => {console.log(error)}
    );
  }
}
