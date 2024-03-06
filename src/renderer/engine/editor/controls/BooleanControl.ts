import { createEditorElement } from '../EditorStyles';
import { GUIControlOptions, GuiControl } from './GuiControl';

export type BooleanControlOptions = GUIControlOptions;

export class BooleanControl extends GuiControl {
  constructor({ ...options }: BooleanControlOptions) {
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

    input.id = this.id;
    input.type = 'checkbox';
    input.checked = this.entity[this.key];

    input.addEventListener('changed', () => {
      this.entity[this.key] = input.checked;
    });

    root.appendChild(input);

    return root;
  }
}
