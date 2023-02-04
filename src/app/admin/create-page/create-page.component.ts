import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../../shared/interfaces';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit{
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    author: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit() {
    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      date: new Date(),
      text: this.form.value.text,
      id: ''
    }
    this.postService.create(post).subscribe(() => {
      this.form.reset()
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title: [null, [Validators.required]],
        text: [null, [Validators.required]],
        author:  [null, [Validators.required]],
      }
    );
  }
}
