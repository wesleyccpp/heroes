import { async, ComponentFixture, TestBed, inject, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';

import { HeroesComponent } from '../heroes/heroes.component';
import { HeroService } from '../hero.service';
// import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, Observable, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '../in-memory-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HEROES } from '../mock-heroes';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService;

  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    heroService.getHeroes.and.returnValue(of([...HEROES]));

    TestBed.configureTestingModule({
      // imports: [HttpClientModule],
      // imports: [HttpClientTestingModule],
      imports: [
        RouterTestingModule.withRoutes([]),
        // HttpClientModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService)
      ],
      declarations: [HeroesComponent],
      providers: [
        // HttpClient,
        // HttpHandler,
        // HeroService
        { provide: HeroService, useValue: heroService }
        /* {
          provide: HeroService, useValue: {
            getHeroes: () => of([{ id: 1, name: 'Superman' }]),
            addHero: (name: string) => of({ id: 2, name: name }),
            deleteHero: (hero: Hero) => of(hero)
          }
        } */
      ]
    })
    //  .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    // heroService = TestBed.get(HeroService);
    fixture.detectChanges();
  }));

  /* beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    // heroService = TestBed.get(HeroService);
    fixture.detectChanges();
  }); */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add hero', () => {
    // inject([HeroService], (heroService: HeroService) => {
    //   spyOn(heroService, 'addHero').and.callFake(() => {
    //     return of({ id: 1, name: 'Jaspion' })
    //   });
    // });
    // spyOn(heroService, 'addHero').and.returnValue(of({ id: 1, name: 'Jaspion' }));
    // let length = 0;

    // console.log('TESTE1', length);

    // component.ngOnInit();

    // spyOn(heroService, 'getHeroes').and.returnValue(of([]));
    //spyOn(heroService, 'addHero').and.returnValue(of({ id: 1, name: 'Jaspion' }));

    // fixture.detectChanges();
    const length = component.heroes.length;
    heroService.addHero.and.returnValue(of({ id: 1, name: 'Jaspion' }));
    component.add('Jaspion');
    expect(component.heroes.length).toBe(length + 1);

    /* fixture.whenStable()
      .then(() => {
        // console.log('HEROES => ADD', component.heroes);
        length = component.heroes.length;
        console.log('TESTE2', length);
        // return fixture.whenStable();
      })
      .finally(() => {
        console.log('TESTE2 FIM');
        component.add('Jaspion');

        fixture.whenStable()
          .then(() => {
            // console.log('HEROES => ADD2', component.heroes);
            console.log('TESTE3', component.heroes);
            // return fixture.whenStable();
          })
          .finally(() => {
            console.log('TESTE3 FIM');
            expect(component.heroes.length).toBe(length + 1);
          });
      }); */
  });

  it('should NOT add hero', () => {
    // const length = component.heroes.length;
    // const addHero = heroService.addHero;
    const addHero = heroService.addHero;
    component.add('');
    expect(addHero).not.toHaveBeenCalled();
  });

  it('should issue error when adding hero', () => {
    // const length = component.heroes.length;
    heroService.addHero.and.returnValue(throwError('ERROR2'));
    const log = spyOn(console, 'log');
    component.add('Jaspion');
    expect(log.calls.mostRecent().args[1]).toEqual('ERROR2'); //  toContain('ERROR2');
  });

  it('should delete hero', () => {
    // spyOn(heroService, 'getHeroes').and.returnValue(of([hero]));
    // spyOn(heroService, 'deleteHero').and.returnValue(of(hero));

    // fixture.detectChanges();
    const length = component.heroes.length;
    const hero = component.heroes[0]// { id: 1, name: 'Jaspion' };
    heroService.deleteHero.and.returnValue(of(hero));
    component.delete(hero);
    expect(component.heroes.length).toBe(length - 1);

    // inject([HeroService], (heroService: HeroService) => {
    //   spyOn(heroService, 'addHero').and.callFake(() => {
    //     return of({ id: 1, name: 'Jaspion' })
    //   });
    // });
    /* component.ngOnInit();

    fixture.whenStable().then(() => {
      // console.log('HEROES => DELETE', component.heroes);
      const length = component.heroes.length;
      const hero = component.heroes[0];
      // spyOn(heroService, 'deleteHero').and.returnValue(of(hero));
      component.delete(hero);
      expect(component.heroes.length).toBe(length - 1);
    }); */
  });
});
