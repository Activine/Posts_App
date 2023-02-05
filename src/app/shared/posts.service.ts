import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { FBCreateResponse, Post } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  create(post: Post): Observable<any> {
    return this.http.post<any>(`${environment.FBDbUrl}/posts.json`, post)
      // .pipe(
      //   map((res: FBCreateResponse) => {
      //     console.log('create response', res);
      //     console.log(post.id);
      //     return {
      //       ...post,
      //       id: res.name,
      //       date: new Date(post.date)
      //     }
      //   }),
      //   tap((res) => console.log(res))
      // )
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.FBDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          console.log('getAll resp', response);
          // console.log(Object.keys(response));
          return Object.keys(response).map((key: string) => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
        }))
  }

  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${environment.FBDbUrl}/posts/${id}.json`)
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.FBDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.FBDbUrl}/posts/${post.id}.json`, post)
      .pipe(
        tap(() => {
          console.log('update', post);

        })
      )
  }
}
