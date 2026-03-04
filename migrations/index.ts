import * as migration_20250807_163830 from "./20250807_163830"
import * as migration_20260201_212045 from "./20260201_212045"

export const migrations = [
   {
      up: migration_20250807_163830.up,
      down: migration_20250807_163830.down,
      name: "20250807_163830",
   },
   {
      up: migration_20260201_212045.up,
      down: migration_20260201_212045.down,
      name: "20260201_212045",
   },
]
