import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRemoveComponent } from './panel-remove.component';

describe('PanelRemoveComponent', () => {
  let component: PanelRemoveComponent;
  let fixture: ComponentFixture<PanelRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
