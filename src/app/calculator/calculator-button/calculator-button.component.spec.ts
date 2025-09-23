import { provideZonelessChangeDetection, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';


@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
  <calculator-button>
    <span class='projected-content underline'>Test content</span>
  </calculator-button>

  `
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compile: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compile = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClases: string[] = compile.classList.value.split(' ');

    expect(component.isDoubleSize()).toBeFalse();
    expect(hostCssClases).toContain('w-1/4');
  });

  it('should apply w-2/4 if isDoubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClases: string[] = compile.classList.value.split(' ');

    expect(hostCssClases).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick is called', () => {
    //Espías
    spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('Should set isPressed to true and then false when keyboardPressStyle is called with a matching key ', (done) => {

    component.contentValue()!.nativeElement.innerText = '1';

    component.keyBoardPressedSyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);

  });

  it('Should not set isPressed to true if key is not matching ', () => {

    component.contentValue()!.nativeElement.innerText = '1';

    component.keyBoardPressedSyle('2');

    expect(component.isPressed()).toBeFalse();
  });

  it('should display projecyed content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');
    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();

  });

});
