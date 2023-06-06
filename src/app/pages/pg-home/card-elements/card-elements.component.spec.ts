import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardElementsComponent } from './card-elements.component';

describe('CardElementsComponent', () => {
  let component: CardElementsComponent;
  let fixture: ComponentFixture<CardElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CardElementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
