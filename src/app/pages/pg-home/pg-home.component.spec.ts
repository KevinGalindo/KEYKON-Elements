import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHomeComponent } from './pg-home.component';

describe('PgHomeComponent', () => {
  let component: PgHomeComponent;
  let fixture: ComponentFixture<PgHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PgHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
