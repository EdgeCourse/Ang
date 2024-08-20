import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeading = true;
  items = ['Apple', 'Banana', 'Orange'];
  isHighlighted = true;
  isBold = true;
  inputValue = '';

  toggleVisibility() {
    this.showHeading = !this.showHeading;
  }
}