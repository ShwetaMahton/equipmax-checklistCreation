import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssetLogComponent } from './dialog-asset-log.component';

describe('DialogAssetLogComponent', () => {
  let component: DialogAssetLogComponent;
  let fixture: ComponentFixture<DialogAssetLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssetLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
