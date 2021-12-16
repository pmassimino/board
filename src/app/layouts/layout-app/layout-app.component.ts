import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-app',
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.css']
})
export class LayoutAppComponent implements OnInit {

  constructor(private authservice:AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  onLogout()
  {
    this.authservice.logout();
    this.router.navigate(['login'])
  }

}
