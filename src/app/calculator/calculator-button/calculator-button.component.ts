import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'isDoubleSize()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  onClick = output<string>();

  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  isCommand = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });

  isDoubleSize = input(false, {
    transform: (value: boolean | string) => (typeof value == 'string' ? value == '' : value),
  });

  isPressed = signal(false);

/*   @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  } */

  /*   @HostBinding('class')
  get hostClass() {
    const base = 'border-r border-b border-indigo-400';
    return `${this.isDoubleSize() ? 'w-2/4' : 'w-1/4'} ${base}`;
  } */

  handleClick() {
    if (!this.contentValue()?.nativeElement) return;
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  keyBoardPressedSyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value != key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
