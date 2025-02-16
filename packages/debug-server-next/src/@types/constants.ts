/*
 * Tencent is pleased to support the open source community by making
 * Hippy available.
 *
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company.
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const DEFAULT_REMOTE = {
  protocol: 'https',
  host: process.env.DOMAIN?.replace(/https?:\/\//, '') || 'devtools.qq.com',
  port: 443,
};

export const SIMULATOR_DEVICE_NAME = 'SIMULATOR';

// custom implement domain list
export const customDomains = [
  'Page',
  'DOM',
  'CSS',
  'Overlay',
  'TDFInspector',
  'TDFPerformance',
  'TDFMemory',
  'TDFLog',
  'TDFRuntime',
];

// domain only implement by vanilla js
export const vanillaJSDomains = ['Network', 'DOMStorage', 'Storage'];

export const LOG_PROTOCOLS = [
  'Runtime.callFunctionOn',
  'Runtime.compileScript',
  'Runtime.discardConsoleEntries',
  'Runtime.enable',
  'Runtime.evaluate',
  'Runtime.getIsolateId',
  'Runtime.getProperties',
  'Runtime.releaseObject',
  'Runtime.releaseObjectGroup',
  'Runtime.runIfWaitingForDebugger',
];

export const VANILLA_JS_METHODS = [
  // 'Log.enable',
  // 'Log.clear',
  // 'Log.startViolationsReport',
  'Page.getResourceTree',
  'Network.deleteCookies',
  'Network.setCookie',
  'Network.enable',
  'Network.getCookies',
  'Network.getResponseBody',
  'DOMStorage.clear',
  'DOMStorage.enable',
  'DOMStorage.getDOMStorageItems',
  'DOMStorage.removeDOMStorageItem',
  'DOMStorage.setDOMStorageItem',
  // 'IndexedDB.enable',
  // 'IndexedDB.requestDatabaseNames',
  // 'Inspector.enable',
  'Storage.trackCacheStorageForOrigin',
  'Storage.trackIndexedDBForOrigin',
  'Storage.clearDataForOrigin',
];
