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
  emojiPickerDisplayed: Boolean;
  private wasInside = false;
  private editor;
  // editorContent = '';
  private postInfo: Post;

  editorConfig = {
    selector: 'textarea',
    plugins: 'autolink noneditable',
    toolbar: 'undo redo | bold italic underline',
    browser_spellcheck: true,
    menubar: false,
    statusbar: false
  };

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

  addEmoji(event: { $event: MouseEvent, emoji: EmojiData }) {
    let emoticonElement = <HTMLElement>event.$event.target;
    if (!emoticonElement.style.backgroundImage || emoticonElement.style.backgroundImage === '') {
      emoticonElement = <HTMLElement>emoticonElement.firstChild;
    }
    emoticonElement.classList.add("mceNonEditable");
    this.editor.insertContent(emoticonElement.outerHTML);
  }

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.emojiPickerDisplayed = false;
    }
    this.wasInside = false;
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
