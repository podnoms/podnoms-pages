import { NgxLoggerLevel, LoggerConfig } from 'ngx-logger';

const _logConfig: LoggerConfig = {
    // serverLoggingUrl: '/api/logs',
    level: NgxLoggerLevel.INFO,
    serverLogLevel: NgxLoggerLevel.OFF,
    colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
};

export const environment = {
    production: true,
    apiHost: 'https://api.podnoms.com/pub',
    logConfig: _logConfig,
};
