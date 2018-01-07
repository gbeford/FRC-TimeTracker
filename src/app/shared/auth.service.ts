import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// from https://angularfirebase.com/lessons/role-based-authorization-with-firestore-nosql-and-angular-5/#Rules-for-the-User-Document

@Injectable()
export class AuthService {
    private authState: Observable<firebase.User>;
    private currentUser: firebase.User = null;

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.authState = this.afAuth.authState;
        // this.authState.subscribe(user => {
        //     this.currentUser = user || null;
        //     if (this.currentUser) {
        //         const doc = this.afs.doc(`users/${this.currentUser.uid}`);
        //         doc.set({
        //             uid: user.uid,
        //             name: user.displayName,
        //             email: user.email,
        //             lastLogin: new Date()
        //         }, { merge: true });
        //     }
        // });
    }

    getAuthState() {
        return this.authState;
    }

    logOut() {
        this.afAuth.auth.signOut();
    }

    loginWithGoogle() {
        return this.afAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider());

    }
}
