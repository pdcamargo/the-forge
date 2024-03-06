import { EditorStyles, createEditorElement } from '../EditorStyles';
import { GUIControlOptions, GuiControl } from './GuiControl';

export type NumberControlOptions = GUIControlOptions & {
  min?: number;
  max?: number;
  step?: number;
};

export class NumberControl extends GuiControl {
  public readonly min?: number;

  public readonly max?: number;

  public readonly step?: number;

  constructor({ min, max, step, ...options }: NumberControlOptions) {
    super(options);

    this.min = min;
    this.max = max;
    this.step = step;

    this.append();
  }

  protected override createRoot(): HTMLElement {
    const root = createEditorElement('controlContainer');

    EditorStyles.addStyle(root, EditorStyles.controlContainer);

    const label = createEditorElement<HTMLLabelElement>('controlLabel');
    label.htmlFor = this.id;

    label.textContent = this.toReadableKey(this.key);

    root.appendChild(label);

    const input = createEditorElement<HTMLInputElement>('input');

    input.type = this.step === undefined ? 'number' : 'range';
    input.id = this.id;

    if (this.min !== undefined) {
      input.min = this.min.toString();
    }

    if (this.max !== undefined) {
      input.max = this.max.toString();
    }

    if (this.step !== undefined) {
      input.step = this.step.toString();
    }

    input.value = this.entity[this.key];

    input.addEventListener('input', () => {
      this.entity[this.key] = parseFloat(input.value);
    });

    root.appendChild(input);

    return root;
  }
}
