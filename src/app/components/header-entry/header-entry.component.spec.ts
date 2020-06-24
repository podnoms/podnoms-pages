import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEntryComponent } from './header-entry.component';

describe('FeaturedEntryComponent', () => {
    let component: HeaderEntryComponent;
    let fixture: ComponentFixture<HeaderEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderEntryComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
