import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeekComponent } from './add-week.component';

describe('AddWeekComponent', () => {
  let component: AddWeekComponent;
  let fixture: ComponentFixture<AddWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
