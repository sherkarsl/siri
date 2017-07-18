import {Component,Inject} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    userInfo: Observable<UserInfo>;
    isLoggedIn = new BehaviorSubject(false);

     image: string;
     Report: string;

    constructor(private authService: AuthService, private router: Router,@Inject(FirebaseApp) firebaseApp: any) {
                          
        this.userInfo = authService.userInfo;
        this.userInfo
            .map(userInfo => !userInfo.isAnonymous)
            .subscribe(this.isLoggedIn);
    const storageRef = firebaseApp.storage().ref().child('images/image.png');
    storageRef.getDownloadURL().then(url => this.image = url);
    const storageRef1 = firebaseApp.storage().ref().child('images/Report.PNG');
    storageRef1.getDownloadURL().then(url => this.Report = url);
    }

    navigateToLogin(e) {
        this.router.navigate(['/login']);
        e.preventDefault();
    }

    navigateToRegister(e) {
        this.router.navigate(['/register']);
        e.preventDefault();
    }
}
