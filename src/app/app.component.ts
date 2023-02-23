import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
  }

  // loadedFeature: string = 'shopping-list';
  // loadedFeature: string = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
  // sayHello() {
  //   console.log('Hello Angular');
  // }
}
