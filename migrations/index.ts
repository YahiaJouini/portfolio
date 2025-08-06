import * as migration_20250806_025052 from './20250806_025052';

export const migrations = [
  {
    up: migration_20250806_025052.up,
    down: migration_20250806_025052.down,
    name: '20250806_025052'
  },
];
