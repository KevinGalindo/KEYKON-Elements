import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementCategorieComponent } from './element-categorie.component';

describe('ElementCategorieComponent', () => {
  let component: ElementCategorieComponent;
  let fixture: ComponentFixture<ElementCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ElementCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
