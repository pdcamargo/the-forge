function addStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>) {
  Object.entries(style).forEach(([key, value]) => {
    (element.style as any)[key] = value;
  });
}

function removeStyle(
  element: HTMLElement,
  style: Partial<CSSStyleDeclaration>
) {
  Object.entries(style).forEach(([key]) => {
    (element.style as any)[key] = '';
  });
}

export const EditorStyles = {
  controlContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    paddingInline: '8px',
    marginBottom: '5px',
  },
  controlLabel: {
    fontWeight: '500',
    fontSize: '14px',
    width: 'var(--largest-key-length)',
    minWidth: 'var(--largest-key-length)',
  },
  label: {
    fontWeight: '500',
    fontSize: '14px',
  },
  tab: {
    paddingInline: '8px',
    paddingBlock: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  closedTab: {
    backgroundColor: 'rgb(45, 45, 45)',
  },
  openedTab: {
    backgroundColor: 'rgb(26, 26, 26)',
  },
  tabsHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: '6px',
    fontSize: '16px',
    backgroundColor: 'rgb(45, 45, 45)',
  },
  tabContent: {
    backgroundColor: 'rgb(26, 26, 26)',
    color: '#bbbbbb',
    paddingBottom: '4px',
  },
  input: {
    flex: '1',
    width: '100%',
    backgroundColor: 'rgb(45, 45, 45)',
    color: 'rgba(255, 255, 255, 0.8)',
    outline: 'none',
    paddingInline: '4px',
    paddingBlock: '2px',
    border: 'solid 1px rgb(62, 62, 62)',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.5)',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3px',
    display: 'flex',
  },
  foldoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  foldoutTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    fontWeight: '500',
  },
  foldoutContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  addStyle,
  removeStyle,
} as const;

const tagElements: Partial<
  Record<keyof typeof EditorStyles, keyof HTMLElementTagNameMap>
> = {
  input: 'input',
  controlLabel: 'label',
  label: 'span',
};

export const createEditorElement = <
  H extends HTMLElement = HTMLElement,
  T extends keyof typeof EditorStyles = keyof typeof EditorStyles
>(
  targetStyle: Exclude<T, 'addStyle' | 'removeStyle'>
) => {
  const element = document.createElement(tagElements[targetStyle] ?? 'div');

  addStyle(element, EditorStyles[targetStyle]);

  return element as unknown as H;
};
