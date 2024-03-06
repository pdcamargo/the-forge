import { createEditorElement } from '../EditorStyles';
import { GUIControlOptions, GuiControl } from './GuiControl';

export type StringControlOptions = GUIControlOptions;

export class StringControl extends GuiControl {
  constructor({ ...options }: StringControlOptions) {
    super(options);

    this.append();
  }

  protected override createRoot(): HTMLElement {
    const root = createEditorElement('controlContainer');

    const label = createEditorElement<HTMLLabelElement>('controlLabel');
    label.htmlFor = this.id;

    label.textContent = this.toReadableKey(this.key);

    root.appendChild(label);

    const input = createEditorElement<HTMLInputElement>('input');

    input.type = 'text';
    input.id = this.id;
    input.value = this.entity[this.key];

    input.addEventListener('input', () => {
      this.entity[this.key] = input.value;
    });

    root.appendChild(input);

    return root;
  }
}
