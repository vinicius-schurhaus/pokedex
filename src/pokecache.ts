export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };

    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    return this.#cache.get(key)?.val as T | undefined;
  }

  #reap(): void {
    const now = Date.now();

    for (const [key, entry] of this.#cache.entries()) {
      if (now - entry.createdAt >= this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
