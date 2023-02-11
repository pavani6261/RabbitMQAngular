import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitMQComponent } from './rabbit-mq.component';

describe('RabbitMQComponent', () => {
  let component: RabbitMQComponent;
  let fixture: ComponentFixture<RabbitMQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbitMQComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabbitMQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
