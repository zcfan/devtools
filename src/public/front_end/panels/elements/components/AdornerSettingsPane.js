// Copyright (c) 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import adornerSettingsPaneStyles from './adornerSettingsPane.css.js';
const UIStrings = {
    /**
      * @description Title of a list of settings to toggle badges.
      */
    settingsTitle: 'Show badges',
    /**
     * @description ARIA label of the button to close the badge settings pane
     */
    closeButton: 'Close',
};
const str_ = i18n.i18n.registerUIStrings('panels/elements/components/AdornerSettingsPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html } = LitHtml;
export class AdornerSettingUpdatedEvent extends Event {
    data;
    constructor(adornerName, isEnabledNow, newSettings) {
        super('adornersettingupdated', {});
        this.data = { adornerName, isEnabledNow, newSettings };
    }
}
export class AdornerSettingsPane extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-adorner-settings-pane`;
    shadow = this.attachShadow({ mode: 'open' });
    settings = new Map();
    connectedCallback() {
        this.shadow.adoptedStyleSheets = [adornerSettingsPaneStyles];
    }
    set data(data) {
        this.settings = new Map(data.settings.entries());
        this.render();
    }
    show() {
        this.classList.remove('hidden');
        const settingsPane = this.shadow.querySelector('.adorner-settings-pane');
        if (settingsPane) {
            settingsPane.focus();
        }
    }
    hide() {
        this.classList.add('hidden');
    }
    onChange(ev) {
        const inputEl = ev.target;
        const adorner = inputEl.dataset.adorner;
        if (adorner === undefined) {
            return;
        }
        const isEnabledNow = inputEl.checked;
        this.settings.set(adorner, isEnabledNow);
        this.dispatchEvent(new AdornerSettingUpdatedEvent(adorner, isEnabledNow, this.settings));
        this.render();
    }
    render() {
        const settingTemplates = [];
        for (const [adorner, isEnabled] of this.settings) {
            // Disabled until https://crbug.com/1079231 is fixed.
            // clang-format off
            settingTemplates.push(html `
        <label class="setting" title=${adorner}>
          <input
            class="adorner-status"
            type="checkbox" name=${adorner}
            .checked=${isEnabled}
            data-adorner=${adorner}>
          <span class="adorner-name">${adorner}</span>
        </label>
      `);
            // clang-format on
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      <div class="adorner-settings-pane" tabindex="-1">
        <div class="settings-title">${i18nString(UIStrings.settingsTitle)}</div>
        <div class="setting-list" @change=${this.onChange}>
          ${settingTemplates}
        </div>
        <button class="close" @click=${this.hide} aria-label=${i18nString(UIStrings.closeButton)}></button>
      </div>
    `, this.shadow, {
            host: this,
        });
        // clang-format on
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-adorner-settings-pane', AdornerSettingsPane);
