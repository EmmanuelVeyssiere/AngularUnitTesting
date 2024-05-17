import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "../hero.service"
import { MessageService } from "../message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        })

        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        // it('should call get with correct url', inject([HeroService, HttpTestingController], (heroService:HeroService, httpTestingController:HttpTestingController) => {
        it('should call get with correct url', () => {
            heroService.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4);
            });

            const req = httpTestingController.expectOne('api/heroes/4');

            req.flush({ id: 4, name: 'SuperDude', strengh: 100 });
            expect(req.request.method).toBe('GET');
            httpTestingController.verify();


        })
    })
})