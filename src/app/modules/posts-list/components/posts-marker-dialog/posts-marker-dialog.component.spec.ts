import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsMarkerDialogComponent } from './posts-marker-dialog.component';

describe('PostsMarkerDialogComponent', () => {
  let component: PostsMarkerDialogComponent;
  let fixture: ComponentFixture<PostsMarkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsMarkerDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsMarkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
