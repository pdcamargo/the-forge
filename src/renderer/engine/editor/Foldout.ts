import { Controller } from '.';
import { createEditorElement } from './EditorStyles';

export type GuiFoldoutOptions = {
  title: string;
  defaultOpen?: boolean;
  parent: HTMLElement;
};

export class Foldout extends Controller {
  public title: string;

  public defaultOpen: boolean;

  private foldoutContent!: HTMLElement;

  constructor(options: GuiFoldoutOptions) {
    super();

    this.title = options.title;
    this.defaultOpen =
      typeof options.defaultOpen === 'boolean' ? options.defaultOpen : false;

    this.content = this.createContent(this.defaultOpen);

    options.parent.appendChild(this.content);

    this.content = this.foldoutContent;
  }

  private open() {
    this.foldoutContent.style.display = 'flex';
  }

  private close() {
    this.foldoutContent.style.display = 'none';
  }

  private createContent(isOpen: boolean) {
    const container = createEditorElement('foldoutContainer');

    const title = createEditorElement('foldoutTitle');

    title.textContent = `► ${this.title}`;

    const content = createEditorElement('foldoutContent');

    content.style.display = isOpen ? 'flex' : 'none';

    container.appendChild(title);
    container.appendChild(content);

    this.foldoutContent = content;

    title.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        if (content.style.display === 'none') {
          this.open();
        } else {
          this.close();
        }
      }
    });

    return container;
  }
}
