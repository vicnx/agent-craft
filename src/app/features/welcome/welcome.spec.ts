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

  it('should contain 6 language presets by default with angular first and react second', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    expect(component.presets().length).toBe(6);
    expect(component.presets()[0].id).toBe('angular');
    expect(component.presets()[1].id).toBe('react');
  });

  it('should navigate to /builder/custom on onStart()', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onStart();
    expect(navigateSpy).toHaveBeenCalledWith(['/builder', 'custom']);
  });

  it('should navigate to /builder/:presetId on onChoosePreset()', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.onChoosePreset('react');
    expect(navigateSpy).toHaveBeenCalledWith(['/builder', 'react']);
  });
});
