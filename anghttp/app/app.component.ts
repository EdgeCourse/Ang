import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  posts$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;
  errorMessage!: string;
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error fetching posts: ' + error.message;
          this.loading = false;
          return of([]); 
        })
      );

    this.filteredPosts$ = this.posts$.pipe(
      filter(posts => !!posts.length), // Filter out empty arrays (in case of error)
      map(posts => posts.filter(post => post.title.length > 20)), // Filter by title length
      catchError(() => { 
        this.errorMessage = 'Error filtering posts.';
        this.loading = false;
        return of([]); 
     
      })
  
    );

    // Set loading to false once data is available
    this.filteredPosts$.subscribe(() => this.loading = false);

  
  }
}


/*

This code: 

Fetches data from the JSONPlaceholder API.
Filters the data to keep only posts with longer titles.
Handles potential errors during fetching and filtering.
Displays a loading indicator while data is being fetched/filtered.
Displays the filtered posts in the template or an error message if something goes wrong.

Detailed code explanation:

HttpClient is imported to make HTTP requests (in this case, to fetch data from an API).

Import the HttpClientModule in your app's root module!

Observable and of from RxJS are used for handling asynchronous data streams.
RxJS operators (catchError, map, filter) are included to manipulate and transform the data streams.

Interface Post defines the structure of a Post object, which will be used to represent the data received from the API. Each post has userId, id, title, and body properties.

In the template:

<div *ngFor="let post of filteredPosts$ | async"> ... </div>: This is the core part that displays the data.
*ngFor: Iterates over each post in the filteredPosts$ observable.
async: The async pipe subscribes to the observable, unwraps the data, and automatically unsubscribes when the component is destroyed.

In the AppComponent class:

posts$: An observable that will hold the array of posts fetched from the API.

filteredPosts$: An observable that will hold the filtered posts (those with titles longer than 20 characters).

errorMessage: A string to store any error messages that might occur during data fetching or filtering.

loading: A boolean flag indicating whether data is currently being loaded.

constructor(private http: HttpClient): Injects the HttpClient service, which will be used to make the HTTP request.

ngOnInit(): This method is called once the component is initialized.

this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')...: Makes an HTTP GET request to the JSONPlaceholder API to fetch posts. The get<Post[]> part tells TypeScript that we expect an array of Post objects in response.

.pipe(catchError(error => {...})): handles errors that might occur during the HTTP request. If there's an error, it sets the errorMessage and returns an empty observable (of([])) to avoid crashing the application.

this.filteredPosts$ = this.posts$.pipe(...): This creates a new observable (filteredPosts$) by applying transformations to the posts$ observable.
filter(posts => !!posts.length): Filters out empty arrays (in case of an error during fetching).

map(posts => posts.filter(post => post.title.length > 20)): Filters the posts to keep only those with titles longer than 20 characters.

catchError(() => {...})): Handles errors that might occur during filtering. Similar to the previous catchError, it sets the errorMessage and returns an empty observable.

this.filteredPosts$.subscribe(() => this.loading = false);: Subscribes to the filteredPosts$ observable. Once data is received (even if it's an empty array due to an error), it sets loading to false to hide the loading indicator.



*/