import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCategoriesComponent } from './pg-categories.component';

describe('PgCategoriesComponent', () => {
  let component: PgCategoriesComponent;
  let fixture: ComponentFixture<PgCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PgCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
