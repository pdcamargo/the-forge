import { makeAutoObservable } from 'mobx';
import { SerializedObject } from '../SerializedObject/SerializedObject';

class SelectionStore {
  public selectedObjects: SerializedObject[] = [];

  public get selectedObject() {
    return this.selectedObjects?.[0];
  }

  public selectObject(...objects: SerializedObject[]) {
    this.selectedObjects = objects;
  }

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }
}

export class Selection {
  public static store = new SelectionStore();

  public static get selectedObjects() {
    return Selection.store.selectedObjects;
  }

  public static get selectedObject() {
    return Selection.store.selectedObject;
  }

  public static selectObject(...objects: any[]) {
    Selection.store.selectObject(...objects);
  }
}
