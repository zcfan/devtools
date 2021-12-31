import { DevicePlatform, AppClientType } from './enum';

export interface DebugTarget {
  // 和 bundleName 一一对应，reload 时终端也尽量保持不变
  clientId: string;
  iWDPWsUrl?: string;
  devtoolsFrontendUrl: string;
  faviconUrl?: string;
  thumbnailUrl: string;
  title: string;
  url: string;
  description: string;
  webSocketDebuggerUrl: string;
  platform: DevicePlatform;
  appClientTypeList: AppClientType[];
  type: string;
  deviceName: string;
  deviceId?: string;
  deviceOSVersion?: string;
}