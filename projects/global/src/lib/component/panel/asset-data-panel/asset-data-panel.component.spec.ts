import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDataPanelComponent } from './asset-data-panel.component';

describe('AssetDataPanelComponent', () => {
  let component: AssetDataPanelComponent;
  let fixture: ComponentFixture<AssetDataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
