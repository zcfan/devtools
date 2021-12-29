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

.editor.interacting::before {
  content: '';
  position: fixed;
  inset: 0;
}

.clock,
.pointer,
.center,
.hand,
.dial {
  position: absolute;
}

.clock {
  top: 6px;
  width: 6em;
  height: 6em;
  background-color: var(--color-background);
  border: 0.5em solid var(--color-background-elevation-1);
  border-radius: 9em;
  box-shadow: var(--drop-shadow), inset 0 0 15px var(--box-shadow-outline-color);
  transform: translateX(-3em);
}

.center,
.hand {
  box-shadow: 0 0 2px var(--box-shadow-outline-color);
}

.pointer {
  margin: auto;
  top: 0;
  left: -0.4em;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0.9em 0.9em 0.9em;
  border-color: transparent transparent var(--color-background-elevation-1) transparent;
}

.center,
.hand,
.dial {
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.center {
  width: 0.7em;
  height: 0.7em;
  border-radius: 10px;
}

.dial {
  width: 2px;
  height: var(--clock-dial-length);
  background-color: var(--override-dial-color);
  border-radius: 1px;
}

.hand {
  height: 50%;
  width: 0.3em;
  background: var(--legacy-accent-fg-color);
}

.hand::before {
  content: '';
  display: inline-block;
  position: absolute;
  top: -0.6em;
  left: -0.35em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px var(--box-shadow-outline-color);
}

.hand::before,
.center {
  background-color: var(--legacy-accent-fg-color);
}

:host-context(.-theme-with-dark-background) .hand::before {
  box-shadow: 0 0 5px hsl(0deg 0% 0% / 80%);
}

:host-context(.-theme-with-dark-background) .center,
:host-context(.-theme-with-dark-background) .hand {
  box-shadow: 0 0 2px hsl(0deg 0% 0% / 60%);
}

:host-context(.-theme-with-dark-background) .clock {
  background-color: hsl(225deg 5% 27%);
}

/*# sourceURL=cssAngleEditor.css */
`);
export default styles;
