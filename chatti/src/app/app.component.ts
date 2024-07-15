import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatti';
  constructor(){
   
  }

  async ngOnInit(){
    const pb = new PocketBase('https://pocket.webtree-design.de');
    const data = {
      "username": "test_username",
      "email": "test@example.com",
      "emailVisibility": true,
      "password": "12345678",
      "passwordConfirm": "12345678",
      "name": "test"
  };
  
  const record = await pb.collection('users').create(data);
  }
}
