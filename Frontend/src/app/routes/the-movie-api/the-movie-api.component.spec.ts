import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMovieApiComponent } from './the-movie-api.component';

describe('TheMovieApiComponent', () => {
  let component: TheMovieApiComponent;
  let fixture: ComponentFixture<TheMovieApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMovieApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMovieApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
