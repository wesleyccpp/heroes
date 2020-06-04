import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';

describe('HeroesComponent', () => {
  let injector: TestBed;
  let heroService: HeroService;
  let httpMock: HttpTestingController;
  const heroesUrl = 'api/heroes';  // URL to web api

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    injector = getTestBed();
    heroService = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<Hero[]>', () => {
    const mockHeroes = [
      { id: 1, name: 'Jaspion' },
      { id: 2, name: 'Superman' }
    ];

    heroService.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockHeroes);
  });

  it('should return an Observable<SearchHeroes>', () => {
    const term = 'Jaspion';
    const mockSearchedHeroes = [
      { id: 1, name: term }
    ];

    heroService.searchHeroes(term).subscribe(heroes => {
      expect(heroes.length).toBe(1);
      expect(heroes).toEqual(mockSearchedHeroes);
    });

    const req = httpMock.expectOne(`${heroesUrl}/?name=${term}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockSearchedHeroes);
  });

  it('should add hero', () => {
    const mockAddHero = { id: 1, name: 'Jaspion' };

    heroService.addHero(mockAddHero).subscribe(hero => {
      expect(hero).toEqual(mockAddHero);
    });

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe("POST");
    req.flush(mockAddHero);
  });

  it('should delete hero', () => {
    const id = 1;
    const mockDeleteHero = { id: 1, name: 'Jaspion' };

    heroService.deleteHero(id).subscribe(hero => {
      expect(hero).toEqual(mockDeleteHero);
    });

    const req = httpMock.expectOne(`${heroesUrl}/${id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(mockDeleteHero);
  });

  it('should update hero', () => {
    const mockUpdateHero = { id: 1, name: 'Jaspion' };

    heroService.updateHero(mockUpdateHero).subscribe(hero => {
      expect(hero).toEqual(mockUpdateHero);
    });

    const req = httpMock.expectOne(heroesUrl);
    expect(req.request.method).toBe("PUT");
    req.flush(mockUpdateHero);
  });

  it('should getHero', () => {
    const id = 1;
    const mockHero = { id: 1, name: 'Jaspion' };

    heroService.getHero(id).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${heroesUrl}/${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockHero);
  });

  it('should getHeroNo404', () => {
    const id = 1;
    const mockHero = { id: 1, name: 'Jaspion' };
    const mockHeroes = [
      { id: 1, name: 'Jaspion' },
      { id: 2, name: 'Superman' }
    ];

    heroService.getHeroNo404(id).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${heroesUrl}/?id=${id}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockHeroes);
  });

});
