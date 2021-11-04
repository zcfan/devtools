import { DevtoolsEnv } from './enum';
export interface StartServerArgv {
  host: string;
  port: number;
  static: string;
  entry: string;
  wsPath: string;
  iwdpPort: number;
  iwdpStartPort: number;
  iwdpEndPort: number;
  startAdb: boolean;
  startIWDP: boolean;
  clearAddrInUse: boolean;
  startTunnel: boolean;
  env: DevtoolsEnv;
  publicPath?: string;
  cachePath?: string;
  logPath?: string;
  open: boolean;
}
