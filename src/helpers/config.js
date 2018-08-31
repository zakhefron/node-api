import fs from 'fs';
import ini from 'ini';
import path from 'path';

import {isPathExist} from './common';

export class Config {
  /**
   * Read the configuration from the config file.
   *
   * @param {string} targetConfig
   * @param {*} defaultValue
   * @returns {*}
   */
  static get(targetConfig, defaultValue) {
    const defaultConfigPath = '../../.config.ini';
    const configOverridePath = '../../.config.override.ini';

    if (!isPathExist(defaultConfigPath)) {
      throw new Error('.config.ini file does not exist.');
    }

    if (!isPathExist(configOverridePath)) {
      throw new Error('.config.override.ini file does not exist.');
    }

    const defaultConfig = ini.parse(fs.readFileSync(path.resolve(__dirname, defaultConfigPath), 'utf8'));
    const configOverride = ini.parse(fs.readFileSync(path.resolve(__dirname, configOverridePath), 'utf8'));

    const config = {...defaultConfig, ...configOverride};

    return config[targetConfig] || defaultValue;
  }
}
