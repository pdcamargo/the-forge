import { EditorStyles } from './EditorStyles';
import { Tab } from './Tab';

export type GuiEditorOptions = {
  title?: string;
  id?: string;
};

export class GuiEditor {
  public readonly title: string;
  public readonly id: string;

  public readonly element: HTMLElement;

  private tabElement?: HTMLElement;
  private tabContentElement?: HTMLElement;

  public readonly tabs: Tab[] = [];

  constructor(options: GuiEditorOptions) {
    this.title = options.title ?? 'GuiEditor';
    this.id =
      options.id ?? 'gui-editor' + Math.random().toString(36).substring(2, 9);

    this.element = this.createRoot();
  }

  addTab(title: string) {
    if (!this.tabElement || !this.tabContentElement) {
      this.tabElement = document.createElement('div');
      this.tabContentElement = document.createElement('div');

      EditorStyles.addStyle(this.tabElement, EditorStyles.tabsHeader);
      EditorStyles.addStyle(this.tabContentElement, EditorStyles.tabContent);

      this.element.appendChild(this.tabElement);
      this.element.appendChild(this.tabContentElement);
    }

    const tab = new Tab({
      contentElement: this.tabContentElement!,
      tabsElement: this.tabElement!,
      title,
    });

    this.tabs.push(tab);

    if (this.tabElement!.children.length === 1) {
      tab.open();
    }

    return tab;
  }

  private createRoot() {
    const root = document.createElement('div');

    root.id = this.id;

    root.style.width = '300px';
    root.style.minWidth = 'fit-content';
    root.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    return root;
  }
}
