import * as migration_20250806_035143 from './20250806_035143';

export const migrations = [
  {
    up: migration_20250806_035143.up,
    down: migration_20250806_035143.down,
    name: '20250806_035143'
  },
];
