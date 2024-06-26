import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SupderDude', strength: 55 }
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    })
    describe('delete', () => {
        it('should remove indicated hero from heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;

            component.delete(HEROES[2])

            expect(component.heroes.length).toBe(2);
            expect(component.heroes.includes(HEROES[2])).toBe(false);
        })
        it('should call deleteHero with correct hero', ()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})