type CacheEntry<T> = {
   data: T
   timestamp: number
}

// least recently used cache implementation
export class LRUCache<K, V> {
   private cache = new Map<K, CacheEntry<V>>()
   private accessOrder = new Map<K, number>()
   private accessCounter = 0
   private maxSize: number // maximum number of items in the cache
   private ttl: number // time to live in milliseconds

   constructor(maxSize: number = 100, ttl: number = 24 * 60 * 60 * 1000) {
      this.maxSize = maxSize
      this.ttl = ttl
   }

   get(key: K): V | undefined {
      const entry = this.cache.get(key)
      if (!entry) return undefined

      // check if expired
      if (Date.now() - entry.timestamp > this.ttl) {
         this.delete(key)
         return undefined
      }

      this.accessOrder.set(key, ++this.accessCounter)

      console.log("cache hit for", key)
      return entry.data
   }

   set(key: K, value: V): void {
      // remove existing entry if it exists
      if (this.cache.has(key)) {
         this.delete(key)
      }

      // evict least recently used items if at capacity
      if (this.cache.size >= this.maxSize) {
         this.evictLRU()
      }

      const entry: CacheEntry<V> = {
         data: value,
         timestamp: Date.now(),
      }

      console.log("cache set for", key)
      this.cache.set(key, entry)
      this.accessOrder.set(key, ++this.accessCounter)
   }

   delete(key: K): boolean {
      console.log("cache delete for", key)
      this.accessOrder.delete(key)
      return this.cache.delete(key)
   }

   clear(): void {
      this.cache.clear()
      this.accessOrder.clear()
      this.accessCounter = 0
   }

   private evictLRU(): void {
      let oldestKey: K | undefined
      let oldestAccess = Infinity

      for (const [key, accessTime] of this.accessOrder) {
         if (accessTime < oldestAccess) {
            oldestAccess = accessTime
            oldestKey = key
         }
      }

      if (oldestKey !== undefined) {
         this.delete(oldestKey)
      }
   }
}
