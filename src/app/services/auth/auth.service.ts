import { UsersService } from './../users/users.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  userUid: string | undefined;
  _user: Observable<firebase.User | null>;
  constructor(
    public angularFireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
    ) {
      this._user = this.angularFireAuth.authState;
  }

  get user(): Observable<firebase.User | null> {
    return this._user;
  }

  ngOnInit() {}

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.http.post(`${environment.functionsUrl}/api/auth/create-user`, {
      email: email,
      password: password
    });
  }

  sendEmailLink(email: string) {
    const actionCodeSettings = {
      url: `${environment.baseUrl}/email-link-login`,
      handleCodeInApp: true
    };
    return this.angularFireAuth.sendSignInLinkToEmail(email, actionCodeSettings)
  }

  logout() {
    this.angularFireAuth.signOut()
    .then(res => {
      this.router.navigate(['login']);
    })
  }

  confirmSignInWithEmail(): Promise<firebase.auth.UserCredential | string> {
    return new Promise(async (resolve, reject) => {
      // Confirm the link is a sign-in with email link.
      if (await this.angularFireAuth.isSignInWithEmailLink(this.router.url)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        this.angularFireAuth.signInWithEmailLink(email!, this.router.url)
          .then((user) => {
            console.log('Signed in with email link');
            console.log(user.user?.uid);


            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            resolve(user);
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            console.log(error);
            reject(error)

            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      } else {
        console.log('Not signed in in with email link');
        resolve('Not signed in with email');
      }
    })
  }

}
