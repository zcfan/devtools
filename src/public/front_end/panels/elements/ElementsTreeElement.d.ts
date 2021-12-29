import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Adorners from '../../ui/components/adorners/adorners.js';
import * as TextEditor from '../../ui/legacy/components/text_editor/text_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
import type { ElementsTreeOutline, UpdateRecord } from './ElementsTreeOutline.js';
export declare class ElementsTreeElement extends UI.TreeOutline.TreeElement {
    _node: SDK.DOMModel.DOMNode;
    treeOutline: ElementsTreeOutline | null;
    _gutterContainer: HTMLElement;
    _decorationsElement: HTMLElement;
    _isClosingTag: boolean | undefined;
    _canAddAttributes: boolean | undefined;
    _searchQuery: string | null;
    _expandedChildrenLimit: number;
    _decorationsThrottler: Common.Throttler.Throttler;
    _inClipboard: boolean;
    _hovered: boolean;
    _editing: EditorHandles | null;
    _highlightResult: UI.UIUtils.HighlightChange[];
    _adornerContainer: HTMLElement | undefined;
    _adorners: Adorners.Adorner.Adorner[];
    _styleAdorners: Adorners.Adorner.Adorner[];
    _adornersThrottler: Common.Throttler.Throttler;
    _htmlEditElement: HTMLElement | undefined;
    expandAllButtonElement: UI.TreeOutline.TreeElement | null;
    _searchHighlightsVisible?: boolean;
    selectionElement?: HTMLDivElement;
    _hintElement?: HTMLElement;
    constructor(node: SDK.DOMModel.DOMNode, isClosingTag?: boolean);
    static animateOnDOMUpdate(treeElement: ElementsTreeElement): void;
    static visibleShadowRoots(node: SDK.DOMModel.DOMNode): SDK.DOMModel.DOMNode[];
    static canShowInlineText(node: SDK.DOMModel.DOMNode): boolean;
    static populateForcedPseudoStateItems(contextMenu: UI.ContextMenu.ContextMenu, node: SDK.DOMModel.DOMNode): void;
    isClosingTag(): boolean;
    node(): SDK.DOMModel.DOMNode;
    isEditing(): boolean;
    highlightSearchResults(searchQuery: string): void;
    hideSearchHighlights(): void;
    _hideSearchHighlight(): void;
    setInClipboard(inClipboard: boolean): void;
    get hovered(): boolean;
    set hovered(isHovered: boolean);
    expandedChildrenLimit(): number;
    setExpandedChildrenLimit(expandedChildrenLimit: number): void;
    _createSelection(): void;
    _createHint(): void;
    onbind(): void;
    onunbind(): void;
    onattach(): void;
    onpopulate(): Promise<void>;
    expandRecursively(): Promise<void>;
    onexpand(): void;
    oncollapse(): void;
    select(omitFocus?: boolean, selectedByUser?: boolean): boolean;
    onselect(selectedByUser?: boolean): boolean;
    ondelete(): boolean;
    onenter(): boolean;
    selectOnMouseDown(event: MouseEvent): void;
    ondblclick(event: Event): boolean;
    hasEditableNode(): boolean;
    _insertInLastAttributePosition(tag: Element, node: Element): void;
    _startEditingTarget(eventTarget: Element): boolean;
    _showContextMenu(event: Event): void;
    populateTagContextMenu(contextMenu: UI.ContextMenu.ContextMenu, event: Event): void;
    populateScrollIntoView(contextMenu: UI.ContextMenu.ContextMenu): void;
    populateTextContextMenu(contextMenu: UI.ContextMenu.ContextMenu, textNode: Element): void;
    populateNodeContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    _startEditing(): boolean | undefined;
    _addNewAttribute(): boolean;
    _triggerEditAttribute(attributeName: string): boolean | undefined;
    _startEditingAttribute(attribute: Element, elementForSelection: Element): boolean;
    _startEditingTextNode(textNodeElement: Element): boolean;
    _startEditingTagName(tagNameElement?: Element): boolean;
    _updateEditorHandles(element: Element, config?: UI.InplaceEditor.Config<any>): void;
    _startEditingAsHTML(commitCallback: (arg0: string, arg1: string) => void, disposeCallback: () => void, maybeInitialValue: string | null): void;
    _attributeEditingCommitted(element: Element, newText: string, oldText: string, attributeName: string, moveDirection: string): void;
    _tagNameEditingCommitted(element: Element, newText: string, oldText: string, tagName: string | null, moveDirection: string): void;
    _textNodeEditingCommitted(textNode: SDK.DOMModel.DOMNode, element: Element, newText: string): void;
    _editingCancelled(_element: Element, _context: any): void;
    _distinctClosingTagElement(): Element | null;
    updateTitle(updateRecord?: UpdateRecord | null, onlySearchQueryChanged?: boolean): void;
    _computeLeftIndent(): number;
    updateDecorations(): void;
    _updateDecorationsInternal(): Promise<void>;
    _buildAttributeDOM(parentElement: Element | DocumentFragment, name: string, value: string, updateRecord: UpdateRecord | null, forceValue?: boolean, node?: SDK.DOMModel.DOMNode): HTMLElement;
    _buildPseudoElementDOM(parentElement: DocumentFragment, pseudoElementName: string): void;
    _buildTagDOM(parentElement: DocumentFragment, tagName: string, isClosingTag: boolean, isDistinctTreeElement: boolean, updateRecord: UpdateRecord | null): void;
    _convertWhitespaceToEntities(text: string): {
        text: string;
        entityRanges: Array<TextUtils.TextRange.SourceRange>;
    };
    _nodeTitleInfo(updateRecord: UpdateRecord | null): DocumentFragment;
    remove(): void;
    toggleEditAsHTML(callback?: ((arg0: boolean) => any), startEditing?: boolean): void;
    _copyCSSPath(): void;
    _copyJSPath(): void;
    _copyXPath(): void;
    _copyFullXPath(): void;
    _copyStyles(): Promise<void>;
    _highlightSearchResults(): void;
    _editAsHTML(): void;
    adorn({ name }: {
        name: string;
    }): Adorners.Adorner.Adorner;
    removeAdorner(adornerToRemove: Adorners.Adorner.Adorner): void;
    removeAllAdorners(): void;
    _updateAdorners(): void;
    _updateAdornersInternal(): Promise<void>;
    updateStyleAdorners(): Promise<void>;
    createGridAdorner(): Adorners.Adorner.Adorner | null;
    createScrollSnapAdorner(): Adorners.Adorner.Adorner | null;
    createFlexAdorner(): Adorners.Adorner.Adorner | null;
}
export declare const InitialChildrenLimit = 500;
export declare const ForbiddenClosingTagElements: Set<string>;
export declare const EditTagBlocklist: Set<string>;
export declare function adornerComparator(adornerA: Adorners.Adorner.Adorner, adornerB: Adorners.Adorner.Adorner): number;
export interface EditorHandles {
    commit: () => void;
    cancel: () => void;
    editor?: UI.TextEditor.TextEditor | TextEditor.CodeMirrorTextEditor.CodeMirrorTextEditor;
    resize: () => any;
}
