import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();
  });

  it('should create the footer component', () => {
    const fixture = TestBed.createComponent(Footer);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have correct GitHub and LinkedIn URLs', () => {
    const fixture = TestBed.createComponent(Footer);
    const component = fixture.componentInstance;
    expect(component.githubUrl).toBe('https://github.com/vicnx');
    expect(component.linkedinUrl).toBe('https://www.linkedin.com/in/vicnx/');
  });
});
