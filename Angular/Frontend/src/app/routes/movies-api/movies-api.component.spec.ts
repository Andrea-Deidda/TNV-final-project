import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesApiComponent } from './movies-api.component';

describe('MoviesApiComponent', () => {
  let component: MoviesApiComponent;
  let fixture: ComponentFixture<MoviesApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
