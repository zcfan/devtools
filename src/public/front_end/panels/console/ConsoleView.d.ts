import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as IssueCounter from '../../ui/components/issue_counter/issue_counter.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ConsoleContextSelector } from './ConsoleContextSelector.js';
import type { LevelsMask } from './ConsoleFilter.js';
import { ConsoleFilter } from './ConsoleFilter.js';
import { ConsolePinPane } from './ConsolePinPane.js';
import { ConsolePrompt } from './ConsolePrompt.js';
import { ConsoleSidebar } from './ConsoleSidebar.js';
import { ConsoleGroupViewMessage, ConsoleViewMessage } from './ConsoleViewMessage.js';
import type { ConsoleViewportElement, ConsoleViewportProvider } from './ConsoleViewport.js';
import { ConsoleViewport } from './ConsoleViewport.js';
export declare class ConsoleView extends UI.Widget.VBox implements UI.SearchableView.Searchable, ConsoleViewportProvider {
    _searchableView: UI.SearchableView.SearchableView;
    _sidebar: ConsoleSidebar;
    _isSidebarOpen: boolean;
    _filter: ConsoleViewFilter;
    _consoleToolbarContainer: HTMLElement;
    _splitWidget: UI.SplitWidget.SplitWidget;
    _contentsElement: UI.Widget.WidgetElement;
    _visibleViewMessages: ConsoleViewMessage[];
    _hiddenByFilterCount: number;
    _shouldBeHiddenCache: Set<ConsoleViewMessage>;
    _lastShownHiddenByFilterCount: number;
    _currentMatchRangeIndex: number;
    _searchRegex: RegExp | null;
    _groupableMessages: Map<string, ConsoleViewMessage[]>;
    _groupableMessageTitle: Map<string, ConsoleViewMessage>;
    _shortcuts: Map<number, () => void>;
    _regexMatchRanges: RegexMatchRange[];
    _consoleContextSelector: ConsoleContextSelector;
    _filterStatusText: UI.Toolbar.ToolbarText;
    _showSettingsPaneSetting: Common.Settings.Setting<boolean>;
    _showSettingsPaneButton: UI.Toolbar.ToolbarSettingToggle;
    _progressToolbarItem: UI.Toolbar.ToolbarItem;
    _groupSimilarSetting: Common.Settings.Setting<boolean>;
    _preserveLogCheckbox: UI.Toolbar.ToolbarSettingCheckbox;
    _hideNetworkMessagesCheckbox: UI.Toolbar.ToolbarSettingCheckbox;
    _timestampsSetting: Common.Settings.Setting<unknown>;
    _consoleHistoryAutocompleteSetting: Common.Settings.Setting<boolean>;
    _pinPane: ConsolePinPane;
    _viewport: ConsoleViewport;
    _messagesElement: HTMLElement;
    _messagesCountElement: HTMLElement;
    _viewportThrottler: Common.Throttler.Throttler;
    _pendingBatchResize: boolean;
    _onMessageResizedBound: (e: Common.EventTarget.EventTargetEvent) => void;
    _topGroup: ConsoleGroup;
    _currentGroup: ConsoleGroup;
    _promptElement: HTMLElement;
    _linkifier: Components.Linkifier.Linkifier;
    _consoleMessages: ConsoleViewMessage[];
    _viewMessageSymbol: symbol;
    _consoleHistorySetting: Common.Settings.Setting<string[]>;
    _prompt: ConsolePrompt;
    _immediatelyFilterMessagesForTest?: boolean;
    _maybeDirtyWhileMuted?: boolean;
    _scheduledRefreshPromiseForTest?: Promise<void>;
    _needsFullUpdate?: boolean;
    _buildHiddenCacheTimeout?: number;
    _searchShouldJumpBackwards?: boolean;
    _searchProgressIndicator?: UI.ProgressIndicator.ProgressIndicator;
    _innerSearchTimeoutId?: number;
    _muteViewportUpdates?: boolean;
    _waitForScrollTimeout?: number;
    _issueCounter: IssueCounter.IssueCounter.IssueCounter;
    private pendingSidebarMessages;
    private userHasOpenedSidebarAtLeastOnce;
    private issueToolbarThrottle;
    private requestResolver;
    private issueResolver;
    constructor();
    static instance(): ConsoleView;
    static clearConsole(): void;
    _onFilterChanged(): void;
    _setImmediatelyFilterMessagesForTest(): void;
    searchableView(): UI.SearchableView.SearchableView;
    _clearHistory(): void;
    _consoleHistoryAutocompleteChanged(): void;
    itemCount(): number;
    itemElement(index: number): ConsoleViewportElement | null;
    fastHeight(index: number): number;
    minimumRowHeight(): number;
    _registerWithMessageSink(): void;
    _addSinkMessage(message: Common.Console.Message): void;
    _consoleTimestampsSettingChanged(): void;
    _executionContextChanged(): void;
    willHide(): void;
    wasShown(): void;
    focus(): void;
    _focusPrompt(): void;
    restoreScrollPositions(): void;
    onResize(): void;
    _hidePromptSuggestBox(): void;
    _invalidateViewport(): Promise<void>;
    _updateIssuesToolbarItem(): void;
    _scheduleViewportRefresh(): void;
    _scheduleViewportRefreshForTest(_muted: boolean): void;
    _immediatelyScrollToBottom(): void;
    _updateFilterStatus(): void;
    _onConsoleMessageAdded(event: Common.EventTarget.EventTargetEvent): void;
    _addConsoleMessage(message: SDK.ConsoleModel.ConsoleMessage): void;
    _onConsoleMessageUpdated(event: Common.EventTarget.EventTargetEvent): void;
    _consoleMessageAddedForTest(_viewMessage: ConsoleViewMessage): void;
    _shouldMessageBeVisible(viewMessage: ConsoleViewMessage): boolean;
    _computeShouldMessageBeVisible(viewMessage: ConsoleViewMessage): void;
    _appendMessageToEnd(viewMessage: ConsoleViewMessage, preventCollapse?: boolean): void;
    _messageAppendedForTests(): void;
    _createViewMessage(message: SDK.ConsoleModel.ConsoleMessage): ConsoleViewMessage;
    _onMessageResized(event: Common.EventTarget.EventTargetEvent): Promise<void>;
    _consoleCleared(): void;
    _handleContextMenuEvent(event: Event): void;
    _saveConsole(): Promise<void>;
    _tryToCollapseMessages(viewMessage: ConsoleViewMessage, lastMessage?: ConsoleViewMessage): boolean;
    _buildHiddenCache(startIndex: number, viewMessages: ConsoleViewMessage[]): void;
    _cancelBuildHiddenCache(): void;
    _updateMessageList(): void;
    _addGroupableMessagesToEnd(): void;
    _messagesClicked(event: Event): void;
    _messagesKeyDown(event: Event): void;
    _messagesPasted(_event: Event): void;
    _registerShortcuts(): void;
    _clearPromptBackwards(): void;
    _promptKeyDown(event: Event): void;
    _printResult(result: SDK.RemoteObject.RemoteObject | null, originatingConsoleMessage: SDK.ConsoleModel.ConsoleMessage, exceptionDetails?: Protocol.Runtime.ExceptionDetails): void;
    _commandEvaluated(event: Common.EventTarget.EventTargetEvent): void;
    elementsToRestoreScrollPositionsFor(): Element[];
    searchCanceled(): void;
    performSearch(searchConfig: UI.SearchableView.SearchConfig, shouldJump: boolean, jumpBackwards?: boolean): void;
    _cleanupAfterSearch(): void;
    _searchFinishedForTests(): void;
    _innerSearch(index: number): void;
    _searchMessage(index: number): void;
    jumpToNextSearchResult(): void;
    jumpToPreviousSearchResult(): void;
    supportsCaseSensitiveSearch(): boolean;
    supportsRegexSearch(): boolean;
    _jumpToMatch(index: number): void;
    _updateStickToBottomOnPointerDown(isRightClick?: boolean): void;
    _updateStickToBottomOnPointerUp(): void;
    _updateViewportStickinessForTest(): void;
    _updateStickToBottomOnWheel(): void;
    _promptTextChanged(): void;
    _promptTextChangedForTest(): void;
    _isScrolledToBottom(): boolean;
}
export declare class ConsoleViewFilter {
    _filterChanged: () => void;
    _messageLevelFiltersSetting: Common.Settings.Setting<LevelsMask>;
    _hideNetworkMessagesSetting: Common.Settings.Setting<boolean>;
    _filterByExecutionContextSetting: Common.Settings.Setting<boolean>;
    _suggestionBuilder: UI.FilterSuggestionBuilder.FilterSuggestionBuilder;
    _textFilterUI: UI.Toolbar.ToolbarInput;
    _textFilterSetting: Common.Settings.Setting<string>;
    _filterParser: TextUtils.TextUtils.FilterParser;
    _currentFilter: ConsoleFilter;
    _levelLabels: Map<Protocol.Log.LogEntryLevel, string>;
    _levelMenuButton: UI.Toolbar.ToolbarButton;
    constructor(filterChangedCallback: () => void);
    onMessageAdded(message: SDK.ConsoleModel.ConsoleMessage): void;
    setLevelMenuOverridden(overridden: boolean): void;
    static levelFilterSetting(): Common.Settings.Setting<LevelsMask>;
    _updateCurrentFilter(): void;
    _onFilterChanged(): void;
    _updateLevelMenuButtonText(): void;
    _showLevelContextMenu(event: Common.EventTarget.EventTargetEvent): void;
    addMessageURLFilter(url: string): void;
    shouldBeVisible(viewMessage: ConsoleViewMessage): boolean;
    clear(): void;
    reset(): void;
}
export declare class ConsoleGroup {
    _parentGroup: ConsoleGroup | null;
    _nestingLevel: number;
    _messagesHidden: boolean;
    constructor(parentGroup: ConsoleGroup | null, groupMessage: ConsoleGroupViewMessage | null);
    static createTopGroup(): ConsoleGroup;
    messagesHidden(): boolean;
    nestingLevel(): number;
    parentGroup(): ConsoleGroup | null;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
    static instance(opts?: {
        forceNew: boolean | null;
    }): ActionDelegate;
}
export interface RegexMatchRange {
    messageIndex: number;
    matchIndex: number;
}
