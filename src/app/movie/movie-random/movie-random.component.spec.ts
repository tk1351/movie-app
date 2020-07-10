import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRandomComponent } from './movie-random.component';

describe('MovieRandomComponent', () => {
  let component: MovieRandomComponent;
  let fixture: ComponentFixture<MovieRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
