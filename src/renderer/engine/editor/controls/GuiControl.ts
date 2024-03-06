export type GUIControlOptions = {
  parent: HTMLElement;
  entity: any;
  key: string;
};

export abstract class GuiControl {
  public readonly id: string;

  protected container!: HTMLElement;

  protected readonly entity: any;

  public readonly key: string;

  protected readonly parent: HTMLElement;

  constructor({ entity, key, parent }: GUIControlOptions) {
    this.entity = entity;
    this.key = key;
    this.parent = parent;
    this.id = `${entity.constructor.name}_${key}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }

  protected append() {
    this.container = this.createRoot();
    this.parent.appendChild(this.container);
  }

  protected abstract createRoot(): HTMLElement;

  protected toReadableKey(key: string) {
    // Convert camelCase, snake_case or kebab-case to Title Case
    return key
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
