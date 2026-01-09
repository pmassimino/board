import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Post, statusPost } from 'src/app/models/model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  currentPost: Post | undefined;
  currentIndex: number = 0;
  private cycleSubscription: Subscription | undefined;

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.populate();
    // Actualizar cada 15 minutos
    const source = timer(1000, 900000);
    source.subscribe(() => this.populate());
  }

  ngOnDestroy(): void {
    if (this.cycleSubscription) {
      this.cycleSubscription.unsubscribe();
    }
  }

  populate(): void {
    this.service.findAll().subscribe(res => {
      this.posts = res.filter(f => f.status === 'Publicado');
      if (this.posts.length > 0) {
        this.currentPost = this.posts[0];
        if (this.posts.length > 1) {
          this.startCyclingPosts();
        }
      }
    }, err => {
      console.log(err);
    });
  }

  startCyclingPosts(): void {
    if (this.cycleSubscription) {
      this.cycleSubscription.unsubscribe();
    }
    this.cycleSubscription = timer(0, 15000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.posts.length;
      this.currentPost = this.posts[this.currentIndex];
    });
  }
}
