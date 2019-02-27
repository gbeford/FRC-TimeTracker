import { TestBed, inject, async } from '@angular/core/testing';
import { EventsService } from './events.service';
import { of } from 'rxjs';
import { environment } from '@environment/environment';
import { IEvent } from 'app/model/event';
import { HttpClient, HttpClientModule } from '@angular/common/http';


describe('EventsService', () => {
  let eventService: EventsService,
    mockHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({  // sets up the service we want to test
      imports: [HttpClientModule],
      providers: [EventsService]  // with MessageService set in providers
    });
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post', 'put', 'get']);

    eventService = new EventsService(mockHttp);
  });

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });

  describe('addEvent', () => {
    fit('should call http.post with the right URL', () => {
      const events: IEvent = { eventID: 0, description: 'Pre Season', show: true, sortOrder: 0 };
      mockHttp.post.and.returnValue(of(false));

      eventService.saveEvent('Pre Season');
      expect(mockHttp.post).toHaveBeenCalledWith(`${environment.baseUrl}${environment.eventApiUrl}`, events);
    });

  });

  describe('deleteEvent', () => {
    fit('should call http.delete with the right URL', () => {
      mockHttp.delete.and.returnValue(of(false)); // creates the observable of the value false

      eventService.deleteEventRecord(1);
      expect(mockHttp.delete).toHaveBeenCalledWith(`${environment.baseUrl}${environment.eventApiUrl}/1`);
    });
  });

  describe('getEventsList', () => {

    // just testing the http.get call only
    fit('should call http.get with the right URL', () => {
      mockHttp.get.and.returnValue(of(false));
      eventService.getEventsList();
      expect(mockHttp.get).toHaveBeenCalledWith(`${environment.baseUrl}${environment.eventApiUrl}`);
    });

    fit('should return a collection of events', () => {
      // mocked response of our service method
      const eventResponse = [{
        eventID: 1,
        description: 'Pie Bake',
        show: false,
        sortOrder: 2
      },
      {
        eventID: 2,
        description: 'Pre Season',
        show: true,
        sortOrder: 1
      }
      ];

      let response;

      // wrap it with of() to return this value as an observable.
      spyOn(eventService, 'getEventsList').and.returnValue(of(eventResponse));

      eventService.getEventsList().subscribe(res => {
        response = res;
      });

      // we add our expectation that response will be set to the return value of the
      // service call, messageResponse.
      expect(response).toEqual(eventResponse);
    });



  //   fit('should throw error properly',
  //     async(
  //       inject([HttpClient, eventService], (http: HttpClient) => {
  //         const err = { status: 404, statusText: 'Not Found' };
  //         spyOn(http, 'get').and.throwError(JSON.stringify(err));
  //         eventService.getEventsList();
  //         expect(eventService.getEventsList).toThrow(JSON.stringify(err));
  //       }
  //       )
  //     )
  //   );

  // });








});
