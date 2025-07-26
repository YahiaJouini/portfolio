import * as migration_20250726_191015 from './20250726_191015';

export const migrations = [
  {
    up: migration_20250726_191015.up,
    down: migration_20250726_191015.down,
    name: '20250726_191015'
  },
];
