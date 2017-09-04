import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryModalComponent } from './recovery-modal.component';

describe('RecoveryModalComponent', () => {
  let component: RecoveryModalComponent;
  let fixture: ComponentFixture<RecoveryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
