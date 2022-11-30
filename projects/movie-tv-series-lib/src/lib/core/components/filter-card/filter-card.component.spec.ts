import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FilterCardComponent } from './filter-card.component';

describe('FilterCardComponent', () => {
  let component: FilterCardComponent;
  let fixture: ComponentFixture<FilterCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should test getCategoryForFilter when a category is selected and emit the category', () => {
    let mockCategory = 'action';
    let spy = spyOn(component.category, 'emit');
    component.getCategoryForFilter(mockCategory);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('action');
  });

  it('should test onExpansionPanelClosed when panel is closed and emits true', () => {
    let spy = spyOn(component.matExpansionPanelClosedEvent, 'emit');
    component.onExpansionPanelClosed();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
