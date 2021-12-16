import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-login',
  templateUrl: './layout-login.component.html',
  styleUrls: ['./layout-login.component.css']
})
export class LayoutLoginComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }
  

}
