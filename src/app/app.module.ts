import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {firebaseConfig} from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthService} from "app/shared/auth.service";
import {LoginUserComponent} from "app/login-user/login-user.component";
import {DisplayUserComponent} from "app/display-user/display-user.component";
import {RegisterUserComponent} from "app/register-user/register-user.component";
import {AlertModule} from "ng2-bootstrap";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {Routes, RouterModule} from "@angular/router";
import {HomePageComponent} from "./pages/home-page.component";
import {RegisterPageComponent} from "./pages/register-page.component";
import {AllInOnePageComponent} from "./pages/all-in-one-page.component";
import {LoginPageComponent} from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { SurveyComponent } from './survey/survey.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap';
import * as Chart from 'chart.js';
window['Chart'] = Chart;


const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    /*{ path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },*/
    { path: '', component: HomePageComponent },
    { path: 'Survey', component: SurveyComponent,canActivate: [LoggedInGuard] }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        SurveyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ChartsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        ProgressbarModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "EDBSIRI"),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes)
    ],
    providers: [AuthService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
