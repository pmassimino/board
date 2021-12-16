import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './core/services/config.service';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { AuthGuard } from './core/services/auth.guard';
import { CotizacionFormComponent } from './cotizacioncereal/cotizacion-form/cotizacion-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { LayoutAppComponent } from './layouts/layout-app/layout-app.component';
import { LayoutLoginComponent } from './layouts/layout-login/layout-login.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ElTiempoComponent } from './el-tiempo/el-tiempo.component';
import { DivisaComponent } from './divisa/divisa.component';

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CotizacionFormComponent,
    LoginComponent,
    IndexComponent,   
    ControlPanelComponent, LayoutAppComponent, LayoutLoginComponent, LayoutMainComponent, ElTiempoComponent, DivisaComponent
  ],
  imports: [BrowserModule,
    HttpClientModule, 
    BrowserModule,
    CommonModule,  
    FormsModule,    
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule                
    
  ],
  providers: [AuthService,
    AuthGuard ,
    ConfigService,{ provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }],  
  bootstrap: [AppComponent]
})
export class AppModule { }
