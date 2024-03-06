import { Controller } from './Controller';
import { EditorStyles, createEditorElement } from './EditorStyles';

export type TabsOptions = {
  tabsElement: HTMLElement;
  contentElement: HTMLElement;
  title: string;
  isOpen?: boolean;
};

export class Tab extends Controller {
  public readonly title: string;

  protected readonly tab: HTMLElement;

  constructor({ tabsElement, contentElement, ...options }: TabsOptions) {
    super();

    this.title = options.title;

    this.tab = this.createTab();
    this.content = this.createContent(options.isOpen);

    tabsElement.appendChild(this.tab);
    contentElement.appendChild(this.content);

    if (options.isOpen) {
      this.open();
    }
  }

  private get isOpen() {
    return this.content.style.display !== 'none';
  }

  public open() {
    if (this.isOpen) {
      return;
    }

    EditorStyles.addStyle(this.tab, EditorStyles.openedTab);

    this.content.style.display = 'block';

    // add display none to all content siblings
    const siblings = Array.from(
      this.content.parentElement?.children ?? []
    ).filter((child) => child !== this.content);

    siblings.forEach((sibling) => {
      (sibling as HTMLElement).style.display = 'none';
    });

    // add closed tab style to all tab siblings
    const tabSiblings = Array.from(
      this.tab.parentElement?.children ?? []
    ).filter((child) => child !== this.tab);

    tabSiblings.forEach((sibling) => {
      EditorStyles.removeStyle(sibling as HTMLElement, EditorStyles.openedTab);
      EditorStyles.addStyle(sibling as HTMLElement, EditorStyles.closedTab);
    });
  }

  private createTab() {
    const root = createEditorElement('tab');

    root.textContent = this.title;

    root.addEventListener('click', () => {
      if (this.isOpen) {
        return;
      }

      this.open();
    });

    return root;
  }

  private createContent(defaultOpen = false) {
    const root = createEditorElement('tabContent');

    root.style.display = defaultOpen ? 'block' : 'none';

    return root;
  }
}
