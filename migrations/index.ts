import * as migration_20250803_010000 from './20250803_010000';

export const migrations = [
  {
    up: migration_20250803_010000.up,
    down: migration_20250803_010000.down,
    name: '20250803_010000'
  },
];
