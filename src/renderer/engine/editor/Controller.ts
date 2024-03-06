import { Foldout } from '.';

import {
  BooleanControlOptions,
  BooleanControl,
} from './controls/BooleanControl';
import { GuiControl } from './controls/GuiControl';
import { NumberControlOptions, NumberControl } from './controls/NumberControl';
import { StringControlOptions, StringControl } from './controls/StringControl';
import {
  Vector2ControlOptions,
  Vector2Control,
} from './controls/Vector2Control';

type GuiControlOptionsToOmit = 'entity' | 'key' | 'parent';

export abstract class Controller {
  protected controls: GuiControl[] = [];

  protected content!: HTMLElement;

  private addControl(control: GuiControl) {
    this.controls.push(control);

    // add --largest-key-length to the content style
    const largestKeyLength = Math.max(
      ...this.controls.map((ctrl) => ctrl.key.length),
    );

    this.content.style.setProperty(
      '--largest-key-length',
      `${largestKeyLength}ch`,
    );
  }

  public addFoldout(title: string, defaultOpen = false): Foldout {
    const foldout = new Foldout({
      parent: this.content,
      title,
      defaultOpen,
    });

    return foldout;
  }

  public addNumber(
    entity: any,
    key: string,
    options?: Omit<NumberControlOptions, GuiControlOptionsToOmit>,
  ): NumberControl {
    const control = new NumberControl({
      entity,
      key,
      parent: this.content,
      ...options,
    });

    this.addControl(control);

    return control;
  }

  public addString(
    entity: any,
    key: string,
    options?: Omit<StringControlOptions, GuiControlOptionsToOmit>,
  ): StringControl {
    const control = new StringControl({
      entity,
      key,
      parent: this.content,
      ...options,
    });

    this.addControl(control);

    return control;
  }

  public addBoolean(
    entity: any,
    key: string,
    options?: Omit<BooleanControlOptions, GuiControlOptionsToOmit>,
  ): BooleanControl {
    const control = new BooleanControl({
      entity,
      key,
      parent: this.content,
      ...options,
    });

    this.addControl(control);

    return control;
  }

  public addVector2(
    entity: any,
    key: string,
    options?: Omit<Vector2ControlOptions, GuiControlOptionsToOmit>,
  ): Vector2Control {
    const control = new Vector2Control({
      entity,
      key,
      parent: this.content,
      ...options,
    });

    this.addControl(control);

    return control;
  }
}
