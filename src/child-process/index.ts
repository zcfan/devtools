import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import path from 'path';
import os from 'os';
import fs from 'fs';
import open from 'open';
import { TunnelEvent, WinstonColor, OSType } from '@/@types/enum';
import { deviceManager } from '@/device-manager';
import { Logger, TunnelLogger } from '@/utils/log';
import { exec } from '@/utils/process';
import { config } from '@/config';
import { StartTunnelOption } from './addon-api';

const childProcessLog = new Logger('child-process', WinstonColor.Magenta);
const tunnelLog = new TunnelLogger('tunnel', WinstonColor.BrightRed);
const tunnelEventLog = new Logger('tunnel-event', WinstonColor.BrightCyan);
let proxyProcess;
let hmrPort;

export const TUNNEL_EVENT = 'message';
export const tunnelEmitter = new EventEmitter();

export const startTunnel = (cb?: StartTunnelCallback) => {
  global.addon.addEventListener((event: TunnelEvent, data: unknown) => {
    try {
      if (event !== TunnelEvent.TunnelLog) {
        tunnelEventLog.info('tunnel event: %s', event);
      }
      if (event === TunnelEvent.ReceiveData) {
        tunnelEmitter.emit(TUNNEL_EVENT, data);
      } else {
        if ([TunnelEvent.RemoveDevice, TunnelEvent.AddDevice].indexOf(event) !== -1) {
          deviceManager.getDeviceList();
          if (event === TunnelEvent.AddDevice) {
            // 每次设备连接后，运行 adb reverse
            startAdbProxy();
          }
        } else if (event === TunnelEvent.AppConnect) {
          deviceManager.onAppConnect();
        } else if (event === TunnelEvent.AppDisconnect) {
          deviceManager.onAppDisconnect();
        } else if (event === TunnelEvent.TunnelLog && data) {
          tunnelLog.info(data);
        }

        if (cb) cb(event, data);
      }
    } catch (e) {
      tunnelLog.error('handle tunnel event error: %s', (e as Error)?.stack);
    }
  });
  global.addon.tunnelStart(getTunnelOption());
};

export const startIWDP = () => {
  const { iWDPPort, iWDPStartPort, iWDPEndPort } = global.debugAppArgv;
  proxyProcess = spawn(
    'ios_webkit_debug_proxy',
    ['--no-frontend', `--config=null:${iWDPPort},:${iWDPStartPort}-${iWDPEndPort}`],
    { detached: false },
  );
  proxyProcess.unref();

  childProcessLog.info(`start IWDP on port ${iWDPPort}`);

  proxyProcess.on('error', (e) => {
    childProcessLog.error('IWDP error: %s', e?.stack);
  });
  proxyProcess.on('close', (code) => {
    childProcessLog.warn(`IWDP close with code: ${code}`);
  });
};

export const startAdbProxy = async () => {
  if (!hmrPort) {
    try {
      const data = fs.readFileSync(config.hmrPortPath);
      hmrPort = data.toString();
    } catch (e) {
      childProcessLog.warn('hmrPort file does not exist.');
    }
  }
  const { port } = global.debugAppArgv || {};
  const adbRelatePath = {
    [OSType.Darwin]: '../build/mac/adb',
    [OSType.Windows]: '../build/win/adb.exe',
  }[os.type()];
  const adbPath = path.join(__dirname, adbRelatePath);
  try {
    if (port) await exec(adbPath, ['reverse', `tcp:${port}`, `tcp:${port}`]);
    if (hmrPort) await exec(adbPath, ['reverse', `tcp:${hmrPort}`, `tcp:${hmrPort}`]);
  } catch (e) {
    childProcessLog.info('Port reverse failed, For iOS app log.info only just ignore the message.');
    childProcessLog.info(`Otherwise please check 'adb devices' command working correctly`);
    if (port) childProcessLog.info(`type 'adb reverse tcp:${port} tcp:${port}' retry!`);
    if (hmrPort) childProcessLog.info(`type 'adb reverse tcp:${hmrPort} tcp:${hmrPort}' retry!`);
    childProcessLog.info('start adb reverse error: %s', (e as Error)?.stack);
  }
};

export const startChrome = async () => {
  const { host, port, open: openChrome } = global.debugAppArgv;
  if (openChrome) {
    const url = `http://${host}:${port}/extensions/home.html`;
    try {
      open(url, { app: { name: open.apps.chrome } });
    } catch (e) {
      childProcessLog.error('open %s by chrome failed, please open manually, %s', url, (e as Error)?.stack);
    }
  }
};

export const killChildProcess = () => {
  if (!proxyProcess) return;
  childProcessLog.warn('on log.info server exit, do some clean...');
  proxyProcess?.kill('SIGKILL');
  proxyProcess = null;
};

type StartTunnelCallback = (event: TunnelEvent, data: unknown) => void;

function getTunnelOption(): StartTunnelOption {
  const { iWDPPort, iWDPStartPort, iWDPEndPort } = global.debugAppArgv;
  const iWDPParams = ['--no-frontend', `--config=null:${iWDPPort},:${iWDPStartPort}-${iWDPEndPort}`];
  let tunnelOption;
  if (os.type() === OSType.Darwin) {
    tunnelOption = {
      adb_path: path.join(__dirname, '../build/mac/adb'),
      iwdp: {
        iwdp_params: iWDPParams,
        iwdp_listen_port: iWDPPort,
      },
      only_use_iwdp: 0,
    };
  }
  if (os.type() === OSType.Windows) {
    tunnelOption = {
      adb_path: path.join(__dirname, '../build/win/adb.exe'),
      iwdp: {
        iwdp_params: iWDPParams,
        iwdp_listen_port: iWDPPort,
        iwdp_path: path.join(__dirname, '../build/win/iwdp1.8.8/ios_webkit_debug_proxy.exe'),
      },
      only_use_iwdp: 1,
      iproxy_path: path.join(__dirname, '../build/win/idevice/iproxy.exe'),
      idevice_info_path: path.join(__dirname, '../build/win/idevice/ideviceinfo.exe'),
    };
  }
  childProcessLog.info('tunnel option: %j', tunnelOption);
  return tunnelOption;
}
