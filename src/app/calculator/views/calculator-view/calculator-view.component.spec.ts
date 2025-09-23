
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';



describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compile: HTMLElement;
  let component: CalculatorViewComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compile = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compile.querySelector('calculator')).not.toBeNull();
   });

  it('should contain basic css classes', () => {
    const divElement = compile.querySelector('div');
    const divCssClasses = divElement?.classList.value.split(' ');
    const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    shouldHave.forEach(className => {
      expect(divCssClasses).toContain(className);
    })

  });


});
