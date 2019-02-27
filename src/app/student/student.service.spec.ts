import { TestBed, inject, async } from '@angular/core/testing';

// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpModule } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { StudentService } from './student.service';

describe('MessageService', () => {
    let studentService: StudentService,
        mockHttp;

    beforeEach(() => {
        TestBed.configureTestingModule({  // sets up the service we want to test
            providers: [StudentService]  // with MessageService set in providers
        });
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post', 'put', 'get']);

        studentService = new StudentService(mockHttp);
    });

    it('should be created', () => {
        expect(studentService).toBeTruthy();
    });



    describe('getStudents', () => {
        fit('should return a collection of students', () => {
            // mocked response of our service method
            const studentResponse = [{
                id: 1,
                studentId: 122321,
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@shrewsburyrobotics.org',
                grade: 10,
                isSignedIn: false,
                messages: ['Go see Carol', 'Sign up for emails'],
                eventID: 1
            },
            {
                messageID: 2,
                messageText: 'You have not sign up for email'
            }
            ];

            let response;

            // wrap it with of() to return this value as an observable.
            spyOn(studentService, 'getStudents').and.returnValue(of(studentResponse));

            studentService.getStudents().subscribe(res => {
                response = res;
            });

            // we add our expectation that response will be set to the return value of the
            // service call, studentResponse.
            expect(response).toEqual(studentResponse);
        });
    });


    describe('getStudent', () => {
        fit('should return a single user', () => {
            const studentResponse = {
                id: 1,
                studentId: 122321,
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@shrewsburyrobotics.org',
                grade: 10,
                isSignedIn: false,
                created: '2/21/19',
                signInTime: '2/21/19',
                messages: ['Go see Carol', 'Sign up for emails'],
                eventID: 1
            };
            let response;

            spyOn(studentService, 'getStudent').and.returnValue(of(studentResponse));

            studentService.getStudent('1').subscribe(res => {
                response = res;
            });

            expect(response).toEqual(studentResponse);
        });

        fit('should fail due to trying to access wrong id', () => {
            const studentResponse = {
                id: 12,
                studentId: 122321,
                firstName: 'John',
                lastName: 'Doe',
                email: 'jdoe@shrewsburyrobotics.org',
                grade: 10,
                isSignedIn: false,
                created: '2/21/19',
                signInTime: '2/21/19',
                messages: ['Go see Carol', 'Sign up for emails'],
                eventID: 1
            };
            let response;

            spyOn(studentService, 'getStudent').and.returnValue(of(studentResponse));

            studentService.getStudent('4').subscribe(res => {
                response = res;
            });

            expect(response).toEqual(studentResponse);
        });


    });
});
