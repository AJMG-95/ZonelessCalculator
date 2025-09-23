import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorService } from '@calculator/services/calculator.service';
import { CalculatorComponent } from './calculator.component';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '@calculator/calculator-button/calculator-button.component';

class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compile: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compile = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    /* fixture.detectChanges(); */
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('Should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    /* console.log(compile); */

    expect(compile.querySelector('span')?.innerText).toBe('456 *');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projecton', () => {
    /* const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    ); */

    const buttons = compile.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');

  });


  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    //lanza el evento al DOM
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    //lanza el evento al DOM
    document.dispatchEvent(eventESC);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123')
    expect(compile.querySelector('#sub-result')?.textContent).toContain('10 -')
  });

});
