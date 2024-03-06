import { createEditorElement } from '../EditorStyles';
import { GUIControlOptions, GuiControl } from './GuiControl';

export type Vector2ControlOptions = GUIControlOptions;

export class Vector2Control extends GuiControl {
  constructor({ ...options }: Vector2ControlOptions) {
    super(options);

    this.append();
  }

  protected override createRoot(): HTMLElement {
    const root = createEditorElement('controlContainer');

    const label = createEditorElement<HTMLLabelElement>('controlLabel');
    label.htmlFor = this.id;

    label.textContent = this.toReadableKey(this.key);

    root.appendChild(label);

    const valueContainer = createEditorElement('valueContainer');
    const xLabel = createEditorElement('label');
    const yLabel = createEditorElement('label');

    xLabel.textContent = 'x';
    yLabel.textContent = 'y';

    const inputX = createEditorElement<HTMLInputElement>('input');
    inputX.type = 'number';
    inputX.id = this.id;
    inputX.value = this.entity[this.key];

    inputX.addEventListener('input', () => {
      this.entity[this.key].x = inputX.value;
    });

    const inputY = createEditorElement<HTMLInputElement>('input');
    inputY.type = 'number';
    inputY.id = this.id;
    inputY.value = this.entity[this.key];

    inputY.addEventListener('input', () => {
      this.entity[this.key].y = inputY.value;
    });

    valueContainer.appendChild(xLabel);
    valueContainer.appendChild(inputX);

    valueContainer.appendChild(yLabel);
    valueContainer.appendChild(inputY);

    root.appendChild(valueContainer);

    return root;
  }
}
