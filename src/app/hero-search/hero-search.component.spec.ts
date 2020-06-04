import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService;

  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [HeroSearchComponent],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })

    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search hero', () => {
    const term = 'Jaspion';
    const heroSearch = { id: 1, name: term };
    heroService.searchHeroes.and.returnValue(of([heroSearch]));
    component.search(term);
    component.heroes$.subscribe((heroes: Hero[]) => {
      expect(heroes).toContain(heroSearch);
    });
  });
});
