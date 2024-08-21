/* 
The valueChanges property of a FormControl in Angular is an observable. It emits a new value every time the value of the control changes.

The RxJS operators being used (debounceTime, distinctUntilChanged, map) operate on observables, transforming the stream of values they emit.

The subscribe method is how we consume the values emitted by an observable. In this case, you're subscribing to the final transformed observable and updating the searchResults array with the emitted values.

The performSearch function itself is synchronous, but the overall flow of data was managed using observables. 

Benefits of using observables: reactivity and declarative programming style.

Reactivity:

Automatic Updates: Observables provide a streamlined way to handle asynchronous events like user input. When the user types into the search box, the valueChanges observable emits new values, triggering the search logic automatically. This ensures that the search results stay in sync with the user's input without the need for manual event handling or constant polling.

Declarative Style: Using observables and RxJS operators creates a declarative programming style, making the code more readable and easier to reason about. Define the data transformations (debounce, distinct, filtering, mapping) in a chain.

Efficient Data Flow:

Lazy Evaluation: Observables are inherently lazy. They don't start executing their logic until someone subscribes to them. This helps avoid unnecessary computations if the search results are not being used or displayed.

Cancellation: Subscriptions to observables can be easily canceled, which is crucial for managing resources and preventing memory leaks, especially when dealing with asynchronous operations like API calls in real-world search implementations. (Cancellation is not being used in this example.)

Error Handling: Observables provide a built-in mechanism for handling errors that might occur during the search process. You can use the catchError operator to gracefully handle errors and provide feedback to the user.

Without observables, more imperative and less efficient:

Event Listeners: You'd need to manually attach an event listener to the input field to capture user input.

Manual Updates: Within the event handler, you'd have to trigger the search logic every time the input changes. This could lead to performance issues if the search is computationally expensive or involves network requests.

Debouncing and Filtering: You'd need to implement debouncing and filtering logic yourself to prevent excessive search requests and ensure only distinct values are processed.

Error Handling: You'd have to explicitly handle potential errors within the search logic and provide appropriate feedback to the user.

Using observables instead improves user experience with reactive updates, and provides control over asynchronous operations.

*/

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <input type="text" [formControl]="searchControl" placeholder="Search...">
    <p *ngIf="searchResults.length > 0">Search results: {{ searchResults }}</p>
  `
})
export class AppComponent {
  searchControl = new FormControl('');
  searchResults: string[] = [];

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((searchTerm): searchTerm is string => searchTerm !== null), // Filter out null values
        map(searchTerm => this.performSearch(searchTerm))
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }

  performSearch(searchTerm: string): string[] {
    const dummyData = ['Apple', 'Banana', 'Orange', 'Grapes'];
    return dummyData.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
