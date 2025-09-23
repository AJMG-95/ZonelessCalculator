import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '@calculator/calculator-button/calculator-button.component';
import { CalculatorService } from '@calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  #calculatorService = inject(CalculatorService);

  calculatorButtons = viewChildren(CalculatorButtonComponent);

  resultText = computed(() => this.#calculatorService.resultText());
  subResultText = computed(() => this.#calculatorService.subResultText());
  lastOperator = computed(() => this.#calculatorService.lastOperator());

  handleClick(key: string) {
    this.#calculatorService.constructNumber(key);
  }

  /*   @HostListener('document:keyup', ['$event']) */
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      'x': '*',
      '/': '÷',
      '÷': '/',
      Enter: '=',
      '-': '-',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyBoardPressedSyle(keyValue);
    });
  }
}
