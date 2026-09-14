import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Welcome } from './welcome';

describe('Welcome', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Welcome],
      providers: [provideRouter([])],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should create the welcome component', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should contain 3 presets by default', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    expect(component.presets().length).toBe(3);
  });

  it('should navigate to /builder on onStart()', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onStart();
    expect(navigateSpy).toHaveBeenCalledWith(['/builder']);
  });

  it('should navigate to /builder/:presetId on onChoosePreset()', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onChoosePreset('cursor');
    expect(navigateSpy).toHaveBeenCalledWith(['/builder', 'cursor']);
  });
});
