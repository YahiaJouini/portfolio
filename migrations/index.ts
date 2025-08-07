import * as migration_20250807_163830 from './20250807_163830';

export const migrations = [
  {
    up: migration_20250807_163830.up,
    down: migration_20250807_163830.down,
    name: '20250807_163830'
  },
];
