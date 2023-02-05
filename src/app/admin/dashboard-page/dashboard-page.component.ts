import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
constructor(
  private auth: AuthService,
  private postService: PostsService,
  private alertService: AlertService
) {}
  posts: Array<Post> = [];
  pSub: Subscription;
  pDel: Subscription;
  searchStr: string = '';

  delete(id: string | undefined) {
    if (id) {
      this.pDel = this.postService.delete(id).subscribe(() => {
        this.alertService.danger('Delete post')
        this.posts = this.posts.filter((el) => el.id !== id)
      })
      console.log(id);
    }
  }

  show(e: Post) {
    console.log(e);

  }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((date)=> {
      console.log(date);
      this.posts = date
      console.log(this.posts);

    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
    if(this.pDel) {
      this.pDel.unsubscribe()
    }
  }
}
