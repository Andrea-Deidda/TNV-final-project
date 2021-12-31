import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieApiDetailsComponent } from './movie-api-details.component';

describe('MovieApiDetailsComponent', () => {
  let component: MovieApiDetailsComponent;
  let fixture: ComponentFixture<MovieApiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieApiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
