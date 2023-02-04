import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/interfaces";

@Pipe({
  name: 'searchPost'
})
export class SearchPipe implements PipeTransform{
  transform(posts: Array<Post>, search: string = ''): Array<Post> {
    if (!search.trim()) {
      return posts
    }

    return posts.filter((post: Post) => {
      return post.title.toLowerCase().includes(search.toLowerCase()) || post.author.toLowerCase().includes(search.toLowerCase())
    })
  }
}
  