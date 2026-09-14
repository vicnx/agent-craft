import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Builder } from './builder';

describe('Builder', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Builder],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the builder component', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show custom target by default when no presetId is provided', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.activeTarget()).toBe('Configuración Personalizada');
  });
});
