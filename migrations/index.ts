import * as migration_20250802_234056 from './20250802_234056';

export const migrations = [
  {
    up: migration_20250802_234056.up,
    down: migration_20250802_234056.down,
    name: '20250802_234056'
  },
];
