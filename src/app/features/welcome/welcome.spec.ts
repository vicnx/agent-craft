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

  it('should contain 11 presets by default across frontend, backend, and mobile', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    expect(component.presets().length).toBe(11);
    expect(component.presets().some((p) => p.id === 'nextjs')).toBe(true);
    expect(component.presets().some((p) => p.id === 'react')).toBe(true);
    expect(component.presets().some((p) => p.id === 'angular')).toBe(true);
    expect(component.presets().some((p) => p.id === 'vue')).toBe(true);
    expect(component.presets().some((p) => p.id === 'svelte')).toBe(true);
    expect(component.presets().some((p) => p.id === 'react-native')).toBe(true);
    expect(component.presets().some((p) => p.id === 'nestjs')).toBe(true);
    expect(component.presets().some((p) => p.id === 'fastapi')).toBe(true);
    expect(component.presets().some((p) => p.id === 'springboot')).toBe(true);
    expect(component.presets().some((p) => p.id === 'aspnet')).toBe(true);
    expect(component.presets().some((p) => p.id === 'go-microservices')).toBe(true);
  });

  it('should filter presets reactively by category', () => {
    const fixture = TestBed.createComponent(Welcome);
    const component = fixture.componentInstance;
    expect(component.filteredPresets().length).toBe(11);

    component.setCategory('frontend');
    expect(component.filteredPresets().length).toBe(5);
    expect(component.filteredPresets().every((p) => p.category === 'frontend')).toBe(true);

    component.setCategory('backend');
    expect(component.filteredPresets().length).toBe(5);
    expect(component.filteredPresets().every((p) => p.category === 'backend')).toBe(true);

    component.setCategory('mobile');
    expect(component.filteredPresets().length).toBe(1);
    expect(component.filteredPresets()[0].id).toBe('react-native');

    component.setCategory('all');
    expect(component.filteredPresets().length).toBe(11);
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
    component.onChoosePreset('nextjs');
    expect(navigateSpy).toHaveBeenCalledWith(['/builder', 'nextjs']);
  });
});
