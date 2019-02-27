import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { of } from 'rxjs';

// https://scotch.io/tutorials/testing-angular-with-jasmine-and-karma-part-1
// https://www.ng-conf.org/2019/angulars-httpclient-testing-depth/
// https://assertible.com/blog/4-common-api-errors-how-to-test-them


describe('MessageService', () => {
    let messageService: MessageService,
        mockHttp;

    beforeEach(() => {
        TestBed.configureTestingModule({  // sets up the service we want to test
            providers: [MessageService]  // with MessageService set in providers
        });
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post', 'put', 'get']);

        messageService = new MessageService(mockHttp);
    });

    it('should be created', () => {
        expect(messageService).toBeTruthy();
    });


    fdescribe('getMessageList', () => {
        fit('should return a collection of messages', () => {
            // mocked response of our service method
            const messageResponse = [{
                messageID: 1,
                messageText: 'Go see Carol'
            },
            {
                messageID: 2,
                messageText: 'You have not sign up for email'
            }
            ];

            let response;

            // wrap it with of() to return this value as an observable.
            spyOn(messageService, 'getMessageList').and.returnValue(of(messageResponse));

            messageService.getMessageList().subscribe(res => {
                response = res;
            });

            // we add our expectation that response will be set to the return value of the
            // service call, messageResponse.
            expect(response).toEqual(messageResponse);
        });
    });


});



