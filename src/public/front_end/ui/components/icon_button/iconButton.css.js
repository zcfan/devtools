// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  white-space: normal;
  display: inline-block;
}

.icon-button {
  border: none;
  margin-right: 2px;
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  background-color: var(--color-background-elevation-1);
}

.icon-button.with-click-handler {
  cursor: pointer;
  border: 1px solid var(--color-details-hairline);
  border-radius: 2px;
}

.icon-button.with-click-handler:hover {
  background-color: var(--legacy-toolbar-hover-bg-color);
}

.icon-button:focus-visible {
  background-color: var(--legacy-toolbar-hover-bg-color);
  border: 1px solid var(--color-details-hairline);
}

.icon-button-title {
  margin-left: 0.5ex;
}

.status-icon {
  margin-left: 1ex;
}

.status-icon:first-child {
  margin-left: inherit;
}

@media (forced-colors: active) {
  .icon-button {
    forced-color-adjust: none;
    background-color: ButtonFace;
  }

  .icon-button.with-click-handler:hover {
    background-color: Highlight;
    color: HighlightText;
  }
}

/*# sourceURL=iconButton.css */
`);
export default styles;