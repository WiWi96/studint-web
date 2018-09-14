import { Component, OnInit, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji/public_api';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorComponent as tinymce} from '@tinymce/tinymce-angular/editor/editor.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
export class EditorComponent implements OnInit, ControlValueAccessor {
  @Output() onInit: EventEmitter<any> = new EventEmitter();
  private editor: any;
  initialValue: string;
  emojiPickerDisplayed: Boolean;
  private wasInside = false;
  propagateChange = (_: any) => {};

  editorConfig = {
    selector: 'textarea',
    plugins: 'autolink paste',
    paste_as_text: true,
    toolbar: 'undo redo | bold italic underline',
    browser_spellcheck: true,
    menubar: false,
    statusbar: false,
    content_style: "* {font-family: Lato; font-size: 16px} p {margin-top: 6px; margin-bottom: 6px}",
    height: 150,
    setup: editor => this.setEditor(editor)
  };

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any) {
    if (obj !== undefined)
      this.initialValue = obj;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {

  }

  private setEditor(editor) {
      this.editor = editor;
  }

  onEditorInit($event: { event, editor }) {
    this.onInit.emit($event);
    this.editor.setContent(this.initialValue);
  }

  onEditorChange($event: { event, editor }) {
    this.propagateChange(this.editor.getContent());
  }

  addEmoji(event: { $event: MouseEvent, emoji: EmojiData }) {
    this.editor.insertContent(event.emoji.native);
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

}
