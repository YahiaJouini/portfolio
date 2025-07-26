import * as migration_20250726_195003 from './20250726_195003';

export const migrations = [
  {
    up: migration_20250726_195003.up,
    down: migration_20250726_195003.down,
    name: '20250726_195003'
  },
];
