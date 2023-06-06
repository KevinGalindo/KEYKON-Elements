import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromElementComponent } from './from-element.component';

describe('FromElementComponent', () => {
  let component: FromElementComponent;
  let fixture: ComponentFixture<FromElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FromElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
