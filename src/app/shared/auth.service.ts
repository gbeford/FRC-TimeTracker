
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { User } from './user';

// from https://angularfirebase.com/lessons/role-based-authorization-with-firestore-nosql-and-angular-5/#Rules-for-the-User-Document

@Injectable()
export class AuthService {

    user$: Observable<User>;

    // constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    //     //// Get auth data, then get firestore user document || null
    //     this.user$ = this.afAuth.authState
    //         .switchMap(user => {
    //             if (user) {
    //                 return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    //             } else {
    //                 return Observable.of(null)
    //             }
    //         });
    // }

    ///// Login/Signup //////
    googleLogin() {
        // const provider = new firebase.auth.GoogleAuthProvider()
        // return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        // return this.afAuth.auth.signInWithPopup(provider)
        //     .then((credential) => {
        //         this.updateUserData(credential.user)
        //     });
    }

    // signOut() {
    //this.afAuth.auth.signOut()
    // }

    canRead(user: User): boolean {
        const allowed = ['admin', 'user'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'edit'];
        return this.checkAuthorization(user, allowed);
    }

    canAdmin(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }

    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) { return false; }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        // const data: User = {
        //     displayName: user.displayName,
        //     uid: user.uid,
        //     email: user.email,
        //     lastLogin: new Date(),
        //     roles: {
        //         user: true
        //     }
        // }
        // return userRef.set(data, { merge: true })
    }
}
