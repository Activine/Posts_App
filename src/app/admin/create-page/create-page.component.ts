import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';


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
    private postService: PostsService,
    private alertService: AlertService
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
    }
    this.postService.create(post).subscribe(() => {
      this.form.reset()
      this.alertService.success('Post Added')
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
