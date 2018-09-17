import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { MessageService } from './message.service';
import { IMessage } from 'app//model/message';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


// @Injectable()
// export class MessageResolver implements Resolve<IMessage> {

//     constructor(private messageService: MessageService,
//         private router: Router) { }

//     resolve(route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<IMessage> {
//         const id = route.params['id'];
    //     // let id = route.paramMap.get('id');
    //     if (isNaN(+id)) {
    //         console.log(`Message id was not a number: ${id}`);
    //         this.router.navigate(['/message']);
    //         return Observable.of(null);
    //     }
    //     return this.messageService.getMessage(+id)
    //         .map(team => {
    //             if (team) {
    //                 console.log('message', Message);
    //                 return team;
    //             }
    //             console.log(`message was not found: ${id}`);
    //             this.router.navigate(['/message']);
    //             return null;
    //         })
    //         .catch(error => {
    //             console.log(`Retrieval error: ${error}`);
    //             this.router.navigate(['/message']);
    //             return Observable.of(null);
//            });
//      }
// }

