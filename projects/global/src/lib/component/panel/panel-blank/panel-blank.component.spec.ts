import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBlankComponent } from './panel-blank.component';

describe('PanelBlankComponent', () => {
  let component: PanelBlankComponent;
  let fixture: ComponentFixture<PanelBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
