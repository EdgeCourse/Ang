/*
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  userProfile: { name: string, email: string } | null = null;

  constructor() {
    this.loadProfile();
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      const profileData = form.value;
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      this.loadProfile(); // Reload to display saved data
    }
  }

  loadProfile() {
    const storedProfile = localStorage.getItem('userProfile');
    this.userProfile = storedProfile ? JSON.parse(storedProfile) : null;
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  
export class AppComponent implements OnInit {
  userProfile: { name: string, email: string } = { name: '', email: '' };

  ngOnInit() {
    this.loadProfile();
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }
  }

  loadProfile() {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      this.userProfile = JSON.parse(storedProfile);
    }
  }
}