/*
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  private excludedWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of'];

  transform(value: string): string {
    if (!value) return '';

    let isPhrase = false;
    let prevChar = ''; // Track the previous character

    return value.split(' ').map((word, index) => {
      const lowerWord = word.toLowerCase();

      if (this.excludedWords.includes(lowerWord)) {
        if (isPhrase) {
          return word;
        } else if (index === 0 || prevChar === '.' || prevChar === '?' || prevChar === '!') { 
          // Capitalize if at the beginning or after punctuation
          isPhrase = true;
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return lowerWord;
        }
      } else {
        isPhrase = true;
        prevChar = word.charAt(word.length - 1); // Update prevChar
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }).join(' ');
  }
}