import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsInfoWindowComponent } from './posts-info-window.component';

describe('PostsInfoWindowComponent', () => {
  let component: PostsInfoWindowComponent;
  let fixture: ComponentFixture<PostsInfoWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsInfoWindowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
