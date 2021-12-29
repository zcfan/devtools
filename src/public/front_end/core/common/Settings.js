/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Root from '../root/root.js';
import { Format } from './Color.js';
import { Console } from './Console.js';
import { ObjectWrapper } from './Object.js';
import { getLocalizedSettingsCategory, getRegisteredSettings, maybeRemoveSettingExtension, registerSettingExtension, registerSettingsForTest, resetSettings, SettingCategory, SettingType } from './SettingRegistration.js';
let settingsInstance;
export class Settings {
    globalStorage;
    localStorage;
    sessionStorage;
    settingNameSet;
    orderValuesBySettingCategory;
    eventSupport;
    registry;
    moduleSettings;
    constructor(globalStorage, localStorage) {
        this.globalStorage = globalStorage;
        this.localStorage = localStorage;
        this.sessionStorage = new SettingsStorage({});
        this.settingNameSet = new Set();
        this.orderValuesBySettingCategory = new Map();
        this.eventSupport = new ObjectWrapper();
        this.registry = new Map();
        this.moduleSettings = new Map();
        for (const registration of getRegisteredSettings()) {
            const { settingName, defaultValue, storageType } = registration;
            const isRegex = registration.settingType === SettingType.REGEX;
            const setting = isRegex && typeof defaultValue === 'string' ?
                this.createRegExpSetting(settingName, defaultValue, undefined, storageType) :
                this.createSetting(settingName, defaultValue, storageType);
            if (Root.Runtime.Runtime.platform() === 'mac' && registration.titleMac) {
                setting.setTitleFunction(registration.titleMac);
            }
            else {
                setting.setTitleFunction(registration.title);
            }
            if (registration.userActionCondition) {
                setting.setRequiresUserAction(Boolean(Root.Runtime.Runtime.queryParam(registration.userActionCondition)));
            }
            setting.setRegistration(registration);
            this._registerModuleSetting(setting);
        }
    }
    static hasInstance() {
        return typeof settingsInstance !== 'undefined';
    }
    static instance(opts = { forceNew: null, globalStorage: null, localStorage: null }) {
        const { forceNew, globalStorage, localStorage } = opts;
        if (!settingsInstance || forceNew) {
            if (!globalStorage || !localStorage) {
                throw new Error(`Unable to create settings: global and local storage must be provided: ${new Error().stack}`);
            }
            settingsInstance = new Settings(globalStorage, localStorage);
        }
        return settingsInstance;
    }
    static removeInstance() {
        settingsInstance = undefined;
    }
    _registerModuleSetting(setting) {
        const settingName = setting.name;
        const category = setting.category();
        const order = setting.order();
        if (this.settingNameSet.has(settingName)) {
            throw new Error(`Duplicate Setting name '${settingName}'`);
        }
        if (category && order) {
            const orderValues = this.orderValuesBySettingCategory.get(category) || new Set();
            if (orderValues.has(order)) {
                throw new Error(`Duplicate order value '${order}' for settings category '${category}'`);
            }
            orderValues.add(order);
            this.orderValuesBySettingCategory.set(category, orderValues);
        }
        this.settingNameSet.add(settingName);
        this.moduleSettings.set(setting.name, setting);
    }
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleSetting(settingName) {
        const setting = this.moduleSettings.get(settingName);
        if (!setting) {
            throw new Error('No setting registered: ' + settingName);
        }
        return setting;
    }
    settingForTest(settingName) {
        const setting = this.registry.get(settingName);
        if (!setting) {
            throw new Error('No setting registered: ' + settingName);
        }
        return setting;
    }
    createSetting(key, defaultValue, storageType) {
        const storage = this._storageFromType(storageType);
        let setting = this.registry.get(key);
        if (!setting) {
            setting = new Setting(key, defaultValue, this.eventSupport, storage);
            this.registry.set(key, setting);
        }
        return setting;
    }
    createLocalSetting(key, defaultValue) {
        return this.createSetting(key, defaultValue, SettingStorageType.Local);
    }
    createRegExpSetting(key, defaultValue, regexFlags, storageType) {
        if (!this.registry.get(key)) {
            this.registry.set(key, new RegExpSetting(key, defaultValue, this.eventSupport, this._storageFromType(storageType), regexFlags));
        }
        return this.registry.get(key);
    }
    clearAll() {
        this.globalStorage.removeAll();
        this.localStorage.removeAll();
        const versionSetting = Settings.instance().createSetting(VersionController.currentVersionName, 0);
        versionSetting.set(VersionController.currentVersion);
    }
    _storageFromType(storageType) {
        switch (storageType) {
            case (SettingStorageType.Local):
                return this.localStorage;
            case (SettingStorageType.Session):
                return this.sessionStorage;
            case (SettingStorageType.Global):
                return this.globalStorage;
        }
        return this.globalStorage;
    }
    getRegistry() {
        return this.registry;
    }
}
export class SettingsStorage {
    object;
    setCallback;
    removeCallback;
    removeAllCallback;
    storagePrefix;
    constructor(object, setCallback, removeCallback, removeAllCallback, storagePrefix) {
        this.object = object;
        this.setCallback = setCallback || function () { };
        this.removeCallback = removeCallback || function () { };
        this.removeAllCallback = removeAllCallback || function () { };
        this.storagePrefix = storagePrefix || '';
    }
    set(name, value) {
        name = this.storagePrefix + name;
        this.object[name] = value;
        this.setCallback(name, value);
    }
    has(name) {
        name = this.storagePrefix + name;
        return name in this.object;
    }
    get(name) {
        name = this.storagePrefix + name;
        return this.object[name];
    }
    remove(name) {
        name = this.storagePrefix + name;
        delete this.object[name];
        this.removeCallback(name);
    }
    removeAll() {
        this.object = {};
        this.removeAllCallback();
    }
    _dumpSizes() {
        Console.instance().log('Ten largest settings: ');
        const sizes = { __proto__: null };
        for (const key in this.object) {
            sizes[key] = this.object[key].length;
        }
        const keys = Object.keys(sizes);
        function comparator(key1, key2) {
            return sizes[key2] - sizes[key1];
        }
        keys.sort(comparator);
        for (let i = 0; i < 10 && i < keys.length; ++i) {
            Console.instance().log('Setting: \'' + keys[i] + '\', size: ' + sizes[keys[i]]);
        }
    }
}
function removeSetting(setting) {
    const name = setting.name;
    const settings = Settings.instance();
    settings.getRegistry().delete(name);
    settings.moduleSettings.delete(name);
    setting.getStorage().remove(name);
}
export class Setting {
    nameInternal;
    defaultValueInternal;
    eventSupport;
    storage;
    titleFunction;
    titleInternal;
    registration;
    requiresUserAction;
    value;
    // TODO(crbug.com/1172300) Type cannot be inferred without changes to consumers. See above.
    serializer = JSON;
    hadUserAction;
    constructor(name, defaultValue, eventSupport, storage) {
        this.nameInternal = name;
        this.defaultValueInternal = defaultValue;
        this.eventSupport = eventSupport;
        this.storage = storage;
        this.registration = null;
    }
    setSerializer(serializer) {
        this.serializer = serializer;
    }
    addChangeListener(listener, thisObject) {
        return this.eventSupport.addEventListener(this.nameInternal, listener, thisObject);
    }
    removeChangeListener(listener, thisObject) {
        this.eventSupport.removeEventListener(this.nameInternal, listener, thisObject);
    }
    get name() {
        return this.nameInternal;
    }
    title() {
        if (this.titleInternal) {
            return this.titleInternal;
        }
        if (this.titleFunction) {
            return this.titleFunction();
        }
        return '';
    }
    setTitleFunction(titleFunction) {
        if (titleFunction) {
            this.titleFunction = titleFunction;
        }
    }
    setTitle(title) {
        this.titleInternal = title;
    }
    setRequiresUserAction(requiresUserAction) {
        this.requiresUserAction = requiresUserAction;
    }
    get() {
        if (this.requiresUserAction && !this.hadUserAction) {
            return this.defaultValueInternal;
        }
        if (typeof this.value !== 'undefined') {
            return this.value;
        }
        this.value = this.defaultValueInternal;
        if (this.storage.has(this.nameInternal)) {
            try {
                this.value = this.serializer.parse(this.storage.get(this.nameInternal));
            }
            catch (e) {
                this.storage.remove(this.nameInternal);
            }
        }
        return this.value;
    }
    set(value) {
        this.hadUserAction = true;
        this.value = value;
        try {
            const settingString = this.serializer.stringify(value);
            try {
                this.storage.set(this.nameInternal, settingString);
            }
            catch (e) {
                this._printSettingsSavingError(e.message, this.nameInternal, settingString);
            }
        }
        catch (e) {
            Console.instance().error('Cannot stringify setting with name: ' + this.nameInternal + ', error: ' + e.message);
        }
        this.eventSupport.dispatchEventToListeners(this.nameInternal, value);
    }
    setRegistration(registration) {
        this.registration = registration;
    }
    type() {
        if (this.registration) {
            return this.registration.settingType;
        }
        return null;
    }
    options() {
        if (this.registration && this.registration.options) {
            return this.registration.options.map(opt => {
                const { value, title, text, raw } = opt;
                return {
                    value: value,
                    title: title(),
                    text: typeof text === 'function' ? text() : text,
                    raw: raw,
                };
            });
        }
        return [];
    }
    reloadRequired() {
        if (this.registration) {
            return this.registration.reloadRequired || null;
        }
        return null;
    }
    category() {
        if (this.registration) {
            return this.registration.category || null;
        }
        return null;
    }
    tags() {
        if (this.registration && this.registration.tags) {
            // Get localized keys and separate by null character to prevent fuzzy matching from matching across them.
            return this.registration.tags.map(tag => tag()).join('\0');
        }
        return null;
    }
    order() {
        if (this.registration) {
            return this.registration.order || null;
        }
        return null;
    }
    _printSettingsSavingError(message, name, value) {
        const errorMessage = 'Error saving setting with name: ' + this.nameInternal + ', value length: ' + value.length +
            '. Error: ' + message;
        console.error(errorMessage);
        Console.instance().error(errorMessage);
        this.storage._dumpSizes();
    }
    defaultValue() {
        return this.defaultValueInternal;
    }
    getStorage() {
        return this.storage;
    }
}
// TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class RegExpSetting extends Setting {
    regexFlags;
    regex;
    constructor(name, defaultValue, eventSupport, storage, regexFlags) {
        super(name, defaultValue ? [{ pattern: defaultValue }] : [], eventSupport, storage);
        this.regexFlags = regexFlags;
    }
    get() {
        const result = [];
        const items = this.getAsArray();
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            if (item.pattern && !item.disabled) {
                result.push(item.pattern);
            }
        }
        return result.join('|');
    }
    getAsArray() {
        return super.get();
    }
    set(value) {
        this.setAsArray([{ pattern: value, disabled: false }]);
    }
    setAsArray(value) {
        delete this.regex;
        super.set(value);
    }
    asRegExp() {
        if (typeof this.regex !== 'undefined') {
            return this.regex;
        }
        this.regex = null;
        try {
            const pattern = this.get();
            if (pattern) {
                this.regex = new RegExp(pattern, this.regexFlags || '');
            }
        }
        catch (e) {
        }
        return this.regex;
    }
}
export class VersionController {
    static get currentVersionName() {
        return 'inspectorVersion';
    }
    static get currentVersion() {
        return 30;
    }
    updateVersion() {
        const localStorageVersion = window.localStorage ? window.localStorage[VersionController.currentVersionName] : 0;
        const versionSetting = Settings.instance().createSetting(VersionController.currentVersionName, 0);
        const currentVersion = VersionController.currentVersion;
        const oldVersion = versionSetting.get() || parseInt(localStorageVersion || '0', 10);
        if (oldVersion === 0) {
            // First run, no need to do anything.
            versionSetting.set(currentVersion);
            return;
        }
        const methodsToRun = this._methodsToRunToUpdateVersion(oldVersion, currentVersion);
        for (const method of methodsToRun) {
            // @ts-ignore Special version method matching
            this[method].call(this);
        }
        versionSetting.set(currentVersion);
    }
    _methodsToRunToUpdateVersion(oldVersion, currentVersion) {
        const result = [];
        for (let i = oldVersion; i < currentVersion; ++i) {
            result.push('_updateVersionFrom' + i + 'To' + (i + 1));
        }
        return result;
    }
    _updateVersionFrom0To1() {
        this._clearBreakpointsWhenTooMany(Settings.instance().createLocalSetting('breakpoints', []), 500000);
    }
    _updateVersionFrom1To2() {
        Settings.instance().createSetting('previouslyViewedFiles', []).set([]);
    }
    _updateVersionFrom2To3() {
        Settings.instance().createSetting('fileSystemMapping', {}).set({});
        removeSetting(Settings.instance().createSetting('fileMappingEntries', []));
    }
    _updateVersionFrom3To4() {
        const advancedMode = Settings.instance().createSetting('showHeaSnapshotObjectsHiddenProperties', false);
        moduleSetting('showAdvancedHeapSnapshotProperties').set(advancedMode.get());
        removeSetting(advancedMode);
    }
    _updateVersionFrom4To5() {
        const settingNames = {
            'FileSystemViewSidebarWidth': 'fileSystemViewSplitViewState',
            'elementsSidebarWidth': 'elementsPanelSplitViewState',
            'StylesPaneSplitRatio': 'stylesPaneSplitViewState',
            'heapSnapshotRetainersViewSize': 'heapSnapshotSplitViewState',
            'InspectorView.splitView': 'InspectorView.splitViewState',
            'InspectorView.screencastSplitView': 'InspectorView.screencastSplitViewState',
            'Inspector.drawerSplitView': 'Inspector.drawerSplitViewState',
            'layerDetailsSplitView': 'layerDetailsSplitViewState',
            'networkSidebarWidth': 'networkPanelSplitViewState',
            'sourcesSidebarWidth': 'sourcesPanelSplitViewState',
            'scriptsPanelNavigatorSidebarWidth': 'sourcesPanelNavigatorSplitViewState',
            'sourcesPanelSplitSidebarRatio': 'sourcesPanelDebuggerSidebarSplitViewState',
            'timeline-details': 'timelinePanelDetailsSplitViewState',
            'timeline-split': 'timelinePanelRecorsSplitViewState',
            'timeline-view': 'timelinePanelTimelineStackSplitViewState',
            'auditsSidebarWidth': 'auditsPanelSplitViewState',
            'layersSidebarWidth': 'layersPanelSplitViewState',
            'profilesSidebarWidth': 'profilesPanelSplitViewState',
            'resourcesSidebarWidth': 'resourcesPanelSplitViewState',
        };
        const empty = {};
        for (const oldName in settingNames) {
            const newName = settingNames[oldName];
            const oldNameH = oldName + 'H';
            let newValue = null;
            const oldSetting = Settings.instance().createSetting(oldName, empty);
            if (oldSetting.get() !== empty) {
                newValue = newValue || {};
                // @ts-expect-error
                newValue.vertical = {};
                // @ts-expect-error
                newValue.vertical.size = oldSetting.get();
                removeSetting(oldSetting);
            }
            const oldSettingH = Settings.instance().createSetting(oldNameH, empty);
            if (oldSettingH.get() !== empty) {
                newValue = newValue || {};
                // @ts-expect-error
                newValue.horizontal = {};
                // @ts-expect-error
                newValue.horizontal.size = oldSettingH.get();
                removeSetting(oldSettingH);
            }
            if (newValue) {
                Settings.instance().createSetting(newName, {}).set(newValue);
            }
        }
    }
    _updateVersionFrom5To6() {
        const settingNames = {
            'debuggerSidebarHidden': 'sourcesPanelSplitViewState',
            'navigatorHidden': 'sourcesPanelNavigatorSplitViewState',
            'WebInspector.Drawer.showOnLoad': 'Inspector.drawerSplitViewState',
        };
        for (const oldName in settingNames) {
            const oldSetting = Settings.instance().createSetting(oldName, null);
            if (oldSetting.get() === null) {
                removeSetting(oldSetting);
                continue;
            }
            const newName = settingNames[oldName];
            const invert = oldName === 'WebInspector.Drawer.showOnLoad';
            const hidden = oldSetting.get() !== invert;
            removeSetting(oldSetting);
            const showMode = hidden ? 'OnlyMain' : 'Both';
            const newSetting = Settings.instance().createSetting(newName, {});
            const newValue = newSetting.get() || {};
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // @ts-expect-error
            newValue.vertical = newValue.vertical || {};
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // @ts-expect-error
            newValue.vertical.showMode = showMode;
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // @ts-expect-error
            newValue.horizontal = newValue.horizontal || {};
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // @ts-expect-error
            newValue.horizontal.showMode = showMode;
            newSetting.set(newValue);
        }
    }
    _updateVersionFrom6To7() {
        const settingNames = {
            'sourcesPanelNavigatorSplitViewState': 'sourcesPanelNavigatorSplitViewState',
            'elementsPanelSplitViewState': 'elementsPanelSplitViewState',
            'stylesPaneSplitViewState': 'stylesPaneSplitViewState',
            'sourcesPanelDebuggerSidebarSplitViewState': 'sourcesPanelDebuggerSidebarSplitViewState',
        };
        const empty = {};
        for (const name in settingNames) {
            const setting = Settings.instance().createSetting(name, empty);
            const value = setting.get();
            if (value === empty) {
                continue;
            }
            // Zero out saved percentage sizes, and they will be restored to defaults.
            if (value.vertical && value.vertical.size && value.vertical.size < 1) {
                value.vertical.size = 0;
            }
            if (value.horizontal && value.horizontal.size && value.horizontal.size < 1) {
                value.horizontal.size = 0;
            }
            setting.set(value);
        }
    }
    _updateVersionFrom7To8() {
    }
    _updateVersionFrom8To9() {
        const settingNames = ['skipStackFramesPattern', 'workspaceFolderExcludePattern'];
        for (let i = 0; i < settingNames.length; ++i) {
            const setting = Settings.instance().createSetting(settingNames[i], '');
            let value = setting.get();
            if (!value) {
                return;
            }
            if (typeof value === 'string') {
                value = [value];
            }
            for (let j = 0; j < value.length; ++j) {
                if (typeof value[j] === 'string') {
                    value[j] = { pattern: value[j] };
                }
            }
            setting.set(value);
        }
    }
    _updateVersionFrom9To10() {
        // This one is localStorage specific, which is fine.
        if (!window.localStorage) {
            return;
        }
        for (const key in window.localStorage) {
            if (key.startsWith('revision-history')) {
                window.localStorage.removeItem(key);
            }
        }
    }
    _updateVersionFrom10To11() {
        const oldSettingName = 'customDevicePresets';
        const newSettingName = 'customEmulatedDeviceList';
        const oldSetting = Settings.instance().createSetting(oldSettingName, undefined);
        const list = oldSetting.get();
        if (!Array.isArray(list)) {
            return;
        }
        const newList = [];
        for (let i = 0; i < list.length; ++i) {
            const value = list[i];
            const device = {};
            device['title'] = value['title'];
            device['type'] = 'unknown';
            device['user-agent'] = value['userAgent'];
            device['capabilities'] = [];
            if (value['touch']) {
                device['capabilities'].push('touch');
            }
            if (value['mobile']) {
                device['capabilities'].push('mobile');
            }
            device['screen'] = {};
            device['screen']['vertical'] = { width: value['width'], height: value['height'] };
            device['screen']['horizontal'] = { width: value['height'], height: value['width'] };
            device['screen']['device-pixel-ratio'] = value['deviceScaleFactor'];
            device['modes'] = [];
            device['show-by-default'] = true;
            device['show'] = 'Default';
            newList.push(device);
        }
        if (newList.length) {
            Settings.instance().createSetting(newSettingName, []).set(newList);
        }
        removeSetting(oldSetting);
    }
    _updateVersionFrom11To12() {
        this._migrateSettingsFromLocalStorage();
    }
    _updateVersionFrom12To13() {
        this._migrateSettingsFromLocalStorage();
        removeSetting(Settings.instance().createSetting('timelineOverviewMode', ''));
    }
    _updateVersionFrom13To14() {
        const defaultValue = { 'throughput': -1, 'latency': 0 };
        Settings.instance().createSetting('networkConditions', defaultValue).set(defaultValue);
    }
    _updateVersionFrom14To15() {
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setting = Settings.instance().createLocalSetting('workspaceExcludedFolders', {});
        const oldValue = setting.get();
        const newValue = {};
        for (const fileSystemPath in oldValue) {
            newValue[fileSystemPath] = [];
            for (const entry of oldValue[fileSystemPath]) {
                newValue[fileSystemPath].push(entry.path);
            }
        }
        setting.set(newValue);
    }
    _updateVersionFrom15To16() {
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setting = Settings.instance().createSetting('InspectorView.panelOrder', {});
        const tabOrders = setting.get();
        for (const key of Object.keys(tabOrders)) {
            tabOrders[key] = (tabOrders[key] + 1) * 10;
        }
        setting.set(tabOrders);
    }
    _updateVersionFrom16To17() {
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setting = Settings.instance().createSetting('networkConditionsCustomProfiles', []);
        const oldValue = setting.get();
        const newValue = [];
        if (Array.isArray(oldValue)) {
            for (const preset of oldValue) {
                if (typeof preset.title === 'string' && typeof preset.value === 'object' &&
                    typeof preset.value.throughput === 'number' && typeof preset.value.latency === 'number') {
                    newValue.push({
                        title: preset.title,
                        value: { download: preset.value.throughput, upload: preset.value.throughput, latency: preset.value.latency },
                    });
                }
            }
        }
        setting.set(newValue);
    }
    _updateVersionFrom17To18() {
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setting = Settings.instance().createLocalSetting('workspaceExcludedFolders', {});
        const oldValue = setting.get();
        const newValue = {};
        for (const oldKey in oldValue) {
            let newKey = oldKey.replace(/\\/g, '/');
            if (!newKey.startsWith('file://')) {
                if (newKey.startsWith('/')) {
                    newKey = 'file://' + newKey;
                }
                else {
                    newKey = 'file:///' + newKey;
                }
            }
            newValue[newKey] = oldValue[oldKey];
        }
        setting.set(newValue);
    }
    _updateVersionFrom18To19() {
        const defaultColumns = { status: true, type: true, initiator: true, size: true, time: true };
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const visibleColumnSettings = Settings.instance().createSetting('networkLogColumnsVisibility', defaultColumns);
        const visibleColumns = visibleColumnSettings.get();
        visibleColumns.name = true;
        visibleColumns.timeline = true;
        const configs = {};
        for (const columnId in visibleColumns) {
            if (!visibleColumns.hasOwnProperty(columnId)) {
                continue;
            }
            configs[columnId.toLowerCase()] = { visible: visibleColumns[columnId] };
        }
        const newSetting = Settings.instance().createSetting('networkLogColumns', {});
        newSetting.set(configs);
        removeSetting(visibleColumnSettings);
    }
    _updateVersionFrom19To20() {
        const oldSetting = Settings.instance().createSetting('InspectorView.panelOrder', {});
        const newSetting = Settings.instance().createSetting('panel-tabOrder', {});
        newSetting.set(oldSetting.get());
        removeSetting(oldSetting);
    }
    _updateVersionFrom20To21() {
        const networkColumns = Settings.instance().createSetting('networkLogColumns', {});
        const columns = networkColumns.get();
        delete columns['timeline'];
        delete columns['waterfall'];
        networkColumns.set(columns);
    }
    _updateVersionFrom21To22() {
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const breakpointsSetting = Settings.instance().createLocalSetting('breakpoints', []);
        const breakpoints = breakpointsSetting.get();
        for (const breakpoint of breakpoints) {
            breakpoint['url'] = breakpoint['sourceFileId'];
            delete breakpoint['sourceFileId'];
        }
        breakpointsSetting.set(breakpoints);
    }
    _updateVersionFrom22To23() {
        // This update is no-op.
    }
    _updateVersionFrom23To24() {
        const oldSetting = Settings.instance().createSetting('searchInContentScripts', false);
        const newSetting = Settings.instance().createSetting('searchInAnonymousAndContentScripts', false);
        newSetting.set(oldSetting.get());
        removeSetting(oldSetting);
    }
    _updateVersionFrom24To25() {
        const defaultColumns = { status: true, type: true, initiator: true, size: true, time: true };
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const networkLogColumnsSetting = Settings.instance().createSetting('networkLogColumns', defaultColumns);
        const columns = networkLogColumnsSetting.get();
        delete columns.product;
        networkLogColumnsSetting.set(columns);
    }
    _updateVersionFrom25To26() {
        const oldSetting = Settings.instance().createSetting('messageURLFilters', {});
        const urls = Object.keys(oldSetting.get());
        const textFilter = urls.map(url => `-url:${url}`).join(' ');
        if (textFilter) {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const textFilterSetting = Settings.instance().createSetting('console.textFilter', '');
            const suffix = textFilterSetting.get() ? ` ${textFilterSetting.get()}` : '';
            textFilterSetting.set(`${textFilter}${suffix}`);
        }
        removeSetting(oldSetting);
    }
    _updateVersionFrom26To27() {
        function renameKeyInObjectSetting(settingName, from, to) {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const setting = Settings.instance().createSetting(settingName, {});
            const value = setting.get();
            if (from in value) {
                value[to] = value[from];
                delete value[from];
                setting.set(value);
            }
        }
        function renameInStringSetting(settingName, from, to) {
            const setting = Settings.instance().createSetting(settingName, '');
            const value = setting.get();
            if (value === from) {
                setting.set(to);
            }
        }
        renameKeyInObjectSetting('panel-tabOrder', 'audits2', 'audits');
        renameKeyInObjectSetting('panel-closeableTabs', 'audits2', 'audits');
        renameInStringSetting('panel-selectedTab', 'audits2', 'audits');
    }
    _updateVersionFrom27To28() {
        const setting = Settings.instance().createSetting('uiTheme', 'systemPreferred');
        if (setting.get() === 'default') {
            setting.set('systemPreferred');
        }
    }
    _updateVersionFrom28To29() {
        function renameKeyInObjectSetting(settingName, from, to) {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const setting = Settings.instance().createSetting(settingName, {});
            const value = setting.get();
            if (from in value) {
                value[to] = value[from];
                delete value[from];
                setting.set(value);
            }
        }
        function renameInStringSetting(settingName, from, to) {
            const setting = Settings.instance().createSetting(settingName, '');
            const value = setting.get();
            if (value === from) {
                setting.set(to);
            }
        }
        renameKeyInObjectSetting('panel-tabOrder', 'audits', 'lighthouse');
        renameKeyInObjectSetting('panel-closeableTabs', 'audits', 'lighthouse');
        renameInStringSetting('panel-selectedTab', 'audits', 'lighthouse');
    }
    _updateVersionFrom29To30() {
        // Create new location agnostic setting
        const closeableTabSetting = Settings.instance().createSetting('closeableTabs', {});
        // Read current settings
        const panelCloseableTabSetting = Settings.instance().createSetting('panel-closeableTabs', {});
        const drawerCloseableTabSetting = Settings.instance().createSetting('drawer-view-closeableTabs', {});
        const openTabsInPanel = panelCloseableTabSetting.get();
        const openTabsInDrawer = panelCloseableTabSetting.get();
        // Set value of new setting
        const newValue = Object.assign(openTabsInDrawer, openTabsInPanel);
        closeableTabSetting.set(newValue);
        // Remove old settings
        removeSetting(panelCloseableTabSetting);
        removeSetting(drawerCloseableTabSetting);
    }
    _migrateSettingsFromLocalStorage() {
        // This step migrates all the settings except for the ones below into the browser profile.
        const localSettings = new Set([
            'advancedSearchConfig',
            'breakpoints',
            'consoleHistory',
            'domBreakpoints',
            'eventListenerBreakpoints',
            'fileSystemMapping',
            'lastSelectedSourcesSidebarPaneTab',
            'previouslyViewedFiles',
            'savedURLs',
            'watchExpressions',
            'workspaceExcludedFolders',
            'xhrBreakpoints',
        ]);
        if (!window.localStorage) {
            return;
        }
        for (const key in window.localStorage) {
            if (localSettings.has(key)) {
                continue;
            }
            const value = window.localStorage[key];
            window.localStorage.removeItem(key);
            Settings.instance().globalStorage.set(key, value);
        }
    }
    _clearBreakpointsWhenTooMany(breakpointsSetting, maxBreakpointsCount) {
        // If there are too many breakpoints in a storage, it is likely due to a recent bug that caused
        // periodical breakpoints duplication leading to inspector slowness.
        if (breakpointsSetting.get().length > maxBreakpointsCount) {
            breakpointsSetting.set([]);
        }
    }
}
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var SettingStorageType;
(function (SettingStorageType) {
    SettingStorageType["Global"] = "Global";
    SettingStorageType["Local"] = "Local";
    SettingStorageType["Session"] = "Session";
})(SettingStorageType || (SettingStorageType = {}));
export function moduleSetting(settingName) {
    return Settings.instance().moduleSetting(settingName);
}
export function settingForTest(settingName) {
    return Settings.instance().settingForTest(settingName);
}
export function detectColorFormat(color) {
    const cf = Format;
    let format;
    const formatSetting = Settings.instance().moduleSetting('colorFormat').get();
    if (formatSetting === cf.Original) {
        format = cf.Original;
    }
    else if (formatSetting === cf.RGB) {
        format = cf.RGB;
    }
    else if (formatSetting === cf.HSL) {
        format = cf.HSL;
    }
    else if (formatSetting === cf.HEX) {
        format = color.detectHEXFormat();
    }
    else {
        format = cf.RGB;
    }
    return format;
}
export { getLocalizedSettingsCategory, getRegisteredSettings, maybeRemoveSettingExtension, registerSettingExtension, SettingCategory, SettingType, registerSettingsForTest, resetSettings, };
