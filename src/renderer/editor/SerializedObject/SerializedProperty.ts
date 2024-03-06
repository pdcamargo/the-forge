import { makeAutoObservable } from 'mobx';
import { Color, Rect, Vector2 } from '@/engine';
import { SerializedObject } from '.';

export class SerializedProperty {
  private _newValue: any;

  constructor(
    public readonly serializedObject: SerializedObject,
    public readonly path: string,
    public value: any,
  ) {
    makeAutoObservable(
      this,
      {
        serializedObject: false,
      },
      { autoBind: true },
    );

    this._newValue = value;
  }

  public get isDirty() {
    return this._newValue !== this.value;
  }

  public get depth() {
    // Combine split logic for dot and array notations into a single operation
    const segments = this.path.match(/[^.[\]]+|\[.*?\]/g) || [];
    return segments.length;
  }

  private setValue(value: any) {
    this._newValue = value;

    // TODO: add undo/redo support
  }

  public get lastSegment() {
    // get last segment of the path
    const segments = this.path.match(/[^.[\]]+|\[.*?\]/g) || [];
    return segments[segments.length - 1];
  }

  public get displayName() {
    // get last segment of the path, then covert snake_case, camelCase, PascalCase to human readable

    const { lastSegment } = this;

    // convert snake_case, camelCase, PascalCase to human readable
    return lastSegment
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .trim();
  }

  public get vector2Value() {
    if (!(this.value instanceof Vector2)) {
      throw new Error('Value is not a Vector2');
    }

    return this.value;
  }

  public set vector2Value(value: Vector2) {
    if (!(value instanceof Vector2)) {
      throw new Error('Value is not a Vector2');
    }

    this.setValue(value);
  }

  public get colorValue() {
    if (!(this.value instanceof Color)) {
      throw new Error('Value is not a Color');
    }

    return this.value;
  }

  public set colorValue(value: Color) {
    if (!(value instanceof Color)) {
      throw new Error('Value is not a Color');
    }

    this.setValue(value);
  }

  public get rectValue() {
    if (!(this.value instanceof Rect)) {
      throw new Error('Value is not a Rect');
    }

    return this.value;
  }

  public set rectValue(value: Rect) {
    if (!(value instanceof Rect)) {
      throw new Error('Value is not a Rect');
    }

    this.setValue(value);
  }

  public get numberValue() {
    if (typeof this.value !== 'number') {
      throw new Error('Value is not a number');
    }

    return this.value;
  }

  public set numberValue(value: number) {
    if (typeof value !== 'number') {
      throw new Error('Value is not a number');
    }

    this.setValue(value);
  }

  public get stringValue() {
    if (typeof this.value !== 'string') {
      throw new Error('Value is not a string');
    }

    return this.value;
  }

  public set stringValue(value: string) {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string');
    }

    this.setValue(value);
  }

  public get booleanValue() {
    if (typeof this.value !== 'boolean') {
      throw new Error('Value is not a boolean');
    }

    return this.value;
  }

  public set booleanValue(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new Error('Value is not a boolean');
    }

    this.setValue(value);
  }
}
