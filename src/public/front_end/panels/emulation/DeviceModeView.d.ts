import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import type * as Protocol from '../../generated/protocol.js';
import { DeviceModeModel } from './DeviceModeModel.js';
import { DeviceModeToolbar } from './DeviceModeToolbar.js';
import { MediaQueryInspector } from './MediaQueryInspector.js';
export declare class DeviceModeView extends UI.Widget.VBox {
    wrapperInstance: UI.Widget.VBox | null;
    blockElementToWidth: WeakMap<HTMLElement, number>;
    _model: DeviceModeModel;
    _mediaInspector: MediaQueryInspector;
    _showMediaInspectorSetting: Common.Settings.Setting<boolean>;
    _showRulersSetting: Common.Settings.Setting<boolean>;
    _topRuler: Ruler;
    _leftRuler: Ruler;
    _presetBlocks: HTMLElement[];
    _responsivePresetsContainer: HTMLElement;
    _screenArea: HTMLElement;
    _pageArea: HTMLElement;
    _outlineImage: HTMLElement;
    _contentClip: HTMLElement;
    _contentArea: HTMLElement;
    _rightResizerElement: HTMLElement;
    _leftResizerElement: HTMLElement;
    _bottomResizerElement: HTMLElement;
    _bottomRightResizerElement: HTMLElement;
    _bottomLeftResizerElement: HTMLElement;
    _cachedResizable: boolean | undefined;
    _mediaInspectorContainer: HTMLElement;
    _screenImage: HTMLElement;
    _toolbar: DeviceModeToolbar;
    _slowPositionStart?: {
        x: number;
        y: number;
    } | null;
    _resizeStart?: UI.Geometry.Size;
    _cachedCssScreenRect?: UI.Geometry.Rect;
    _cachedCssVisiblePageRect?: UI.Geometry.Rect;
    _cachedOutlineRect?: UI.Geometry.Rect;
    _cachedMediaInspectorVisible?: boolean;
    _cachedShowRulers?: boolean;
    _cachedScale?: number;
    _handleWidth?: number;
    _handleHeight?: number;
    constructor();
    _createUI(): void;
    _populatePresetsContainer(): void;
    _createResizer(element: Element, widthFactor: number, heightFactor: number): UI.ResizerWidget.ResizerWidget;
    _onResizeStart(): void;
    _onResizeUpdate(widthFactor: number, heightFactor: number, event: {
        data: {
            shiftKey: boolean;
            currentX: number;
            currentY: number;
            startX: number;
            startY: number;
        };
    }): void;
    exitHingeMode(): void;
    _onResizeEnd(): void;
    _updateUI(): void;
    _loadImage(element: Element, srcset: string): void;
    _onImageLoaded(element: Element, success: boolean): void;
    setNonEmulatedAvailableSize(element: Element): void;
    _contentAreaResized(): void;
    _measureHandles(): void;
    _zoomChanged(): void;
    onResize(): void;
    wasShown(): void;
    willHide(): void;
    captureScreenshot(): Promise<void>;
    captureFullSizeScreenshot(): Promise<void>;
    captureAreaScreenshot(clip?: Protocol.Page.Viewport): Promise<void>;
    _saveScreenshotBase64(screenshot: string): void;
    _paintImage(ctx: CanvasRenderingContext2D, src: string, rect: UI.Geometry.Rect): Promise<void>;
    _saveScreenshot(canvas: HTMLCanvasElement): void;
}
export declare class Ruler extends UI.Widget.VBox {
    _contentElement: HTMLElement;
    _horizontal: boolean;
    _scale: number;
    _count: number;
    _throttler: Common.Throttler.Throttler;
    _applyCallback: (arg0: number) => void;
    _renderedScale: number | undefined;
    _renderedZoomFactor: number | undefined;
    constructor(horizontal: boolean, applyCallback: (arg0: number) => void);
    render(scale: number): void;
    onResize(): void;
    _update(): Promise<void>;
    _onMarkerClick(size: number): void;
}
