import * as migration_20250804_132326 from './20250804_132326';

export const migrations = [
  {
    up: migration_20250804_132326.up,
    down: migration_20250804_132326.down,
    name: '20250804_132326'
  },
];
