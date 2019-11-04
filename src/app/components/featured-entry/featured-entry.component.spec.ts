import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedEntryComponent } from './featured-entry.component';

describe('FeaturedEntryComponent', () => {
  let component: FeaturedEntryComponent;
  let fixture: ComponentFixture<FeaturedEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
