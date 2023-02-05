import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted: boolean = false;

  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    }).subscribe(() => {
      this.submitted = false
      this.alertService.success('Refactored post')
    })
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param: Params) => {
        return this.postsService.getById(param['id'])
      })
      ).subscribe((post: Post) => {
        this.post = post
        this.form = this.formBuilder.group({
          title: [post.title, [Validators.required]],
          text: [post.text, [Validators.required]],
        })
      })
    }

    ngOnDestroy(): void {
      if (this.uSub) {
        this.uSub.unsubscribe()
      }
    }
  }
