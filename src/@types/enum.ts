export const enum DevtoolsEnv {
  Hippy = 'hippy',
  Voltron = 'voltron',
  TDF = 'TDF',
  TDFCore = 'TDFCore',
}

export const enum DevicePlatform {
  Unkonwn = '0',
  IOS = '1',
  Android = '2',
}

export const enum DeviceStatus {
  Connected = '1',
  Disconnected = '2',
}

export const enum TunnelEvent {
  AddDevice = 'tunnel_add_device',
  RemoveDevice = 'tunnel_remove_device',
  AppConnect = 'tunnel_app_connect',
  AppDisconnect = 'tunnel_app_disconnect',
  ReceiveData = 'tunnel_recv_data',
  TunnelLog = 'tunnel_log',
}

export const enum DebuggerProtocolType {
  Unknown,
  CDP,
  DAP,
}

export enum ClientType {
  App = 'app',
  Devtools = 'devtools',
  Unknown = 'unknown',
}

export enum ClientRole {
  Android = 'android_client',
  Devtools = 'devtools',
  IOS = 'ios_client',
  HMRClient = 'hmr_client',
  HMRServer = 'hmr_server',
}

export const enum AppClientEvent {
  Message = 'message',
  Close = 'close',
}

export const enum AppClientType {
  Tunnel = 'TunnelAppClient',
  WS = 'WsAppClient',
  IWDP = 'IWDPAppClient',
}

/**
 * flamechart frame type
 */
export enum PH {
  Begin = 'B',
  End = 'E',
  MetaData = 'M',
  Complete = 'X',
}

export enum DeviceManagerEvent {
  AddDevice = 'addDevice',
  RemoveDevice = 'removeDevice',
  AppDidDisConnect = 'appDidDisConnect',
  AppDidConnect = 'appDidConnect',
  GetDeviceList = 'getDeviceList',
}

export enum ChromePageType {
  Page = 'page',
  Node = 'node',
}

export const enum ErrorCode {
  DomainFiltered = 1,
  NoAppClient = 2,
  EmptyCommand = 3,
}

export const enum ProtocolErrorCode {
  ProtocolNotFound = -32601,
}

export enum MiddlewareType {
  Upward = 'upward',
  Downward = 'downward',
}

export enum DBType {
  Redis = 'redis',
  Memory = 'memory',
}

export enum WinstonColor {
  BgRed = 'bgRed',
  Black = 'black',
  Red = 'red',
  Green = 'green',
  Yellow = 'yellow',
  Blue = 'blue',
  Magenta = 'magenta',
  Cyan = 'cyan',
  White = 'white',
  Gray = 'gray',
  Grey = 'grey',
  BrightRed = 'brightRed',
  BrightGreen = 'brightGreen',
  BrightYellow = 'brightYellow',
  BrightBlue = 'brightBlue',
  BrightMagenta = 'brightMagenta',
  BrightCyan = 'brightCyan',
  BrightWhite = 'brightWhite',
}

export enum InternalChannelEvent {
  WSClose = 'WSClose',
}

export enum ChromeLogLevel {
  Info = 'info',
  Error = 'error',
  Verbose = 'verbose',
  Warning = 'warning',
}

export enum OSType {
  Darwin = 'Darwin',
  Linux = 'Linux',
  Windows = 'Windows_NT',
}

export enum WSCode {
  InvalidRequestParams = 4000,
  HMRServerClosed = 4001,
  NoDebugTarget = 4002,
  ClosePage = 4003,
  ReloadPage = 4004,
}

export enum HMREvent {
  Hot = 'hot',
  LiveReload = 'liveReload',
  Invalid = 'invalid',
  Hash = 'hash',
  Logging = 'logging',
  Overlay = 'overlay',
  Reconnect = 'reconnect',
  Progress = 'progress',
  Ok = 'ok',
  Warnings = 'warnings',
  Errors = 'errors',
  Error = 'error',
  Close = 'close',
  ProgressUpdate = 'progress-update',
  StillOk = 'still-ok',
  ContentChanged = 'content-changed',
  TransferFile = 'transfer-file',
}

export enum WSCode {
  InvalidRequestParams = 4000,
  HMRServerClosed = 4001,
  NoDebugTarget = 4002,
}