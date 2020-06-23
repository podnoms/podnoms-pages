import { NgxLoggerLevel, LoggerConfig } from 'ngx-logger';

const _logConfig: LoggerConfig = {
    // serverLoggingUrl: '/api/logs',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.DEBUG,
    colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    enableSourceMaps: true,
};

export const environment = {
    production: false,
    apiHost: 'https://podnoms.local:5001/pub',
    logConfig: _logConfig,
};
import 'zone.js/dist/zone-error'; // Included with Angular CLI.import { LoggerConfig } from 'ngx-logger';import { NgxLoggerLevel } from 'ngx-logger';
