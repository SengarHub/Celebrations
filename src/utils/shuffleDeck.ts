import { ALL_DRIVE_MEDIA_ITEMS } from '../data/driveCatalog';
import { KeepsakeItem, Milestone } from '../types/keepsake';

export type SurpriseFilterPool = 'all' | 'new-uploads' | 'videos' | 'photos';

// Index threshold for the 60 newly uploaded items (items 84 to 143)
const NEW_UPLOADS_START_INDEX = 84;

export const isItemNewUpload = (item: KeepsakeItem | Milestone): boolean => {
  if ('id' in item && typeof item.id === 'string') {
    const match = item.id.match(/^item-(\d+)$/);
    if (match) {
      const idx = parseInt(match[1], 10);
      if (idx >= NEW_UPLOADS_START_INDEX) return true;
    }
    // Also check dateStr or title for Oct 2026 / 2nd Birthday
    if (item.dateStr && (item.dateStr.includes('2026') && (item.dateStr.includes('Oct') || item.dateStr.includes('Sep') || item.dateStr.includes('Aug')))) {
      return true;
    }
  }
  return false;
};

// Convert KeepsakeItem into Milestone format for lightbox
export const convertItemToMilestone = (item: KeepsakeItem): Milestone => ({
  id: item.id,
  title: item.title,
  phase: item.phaseName,
  dateStr: item.dateStr,
  ageMonthStr: isItemNewUpload(item) ? 'Turning 2 Years Old (Recent Uploads)' : 'Last 1 Year Journey',
  category: 'festivals',
  mediaType: item.type,
  mediaUrl: item.mediaUrl,
  driveUrl: item.driveUrl,
  thumbnailUrl: item.thumbnailUrl,
  caption: item.caption,
  traditionNote: item.traditionNote,
  location: 'Madhya Pradesh, India',
  tags: [item.festivalTag, item.phaseName, isItemNewUpload(item) ? 'New Upload' : 'Milestone']
});

export const ALL_DRIVE_MILESTONES: Milestone[] = ALL_DRIVE_MEDIA_ITEMS.map(convertItemToMilestone);

// Fisher-Yates array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class SurpriseMemoryManager {
  private visitedIds = new Set<string>();
  private shuffledQueues: Record<SurpriseFilterPool, string[]> = {
    'all': [],
    'new-uploads': [],
    'videos': [],
    'photos': []
  };

  constructor() {
    this.refillQueue('all');
    this.refillQueue('new-uploads');
    this.refillQueue('videos');
    this.refillQueue('photos');
  }

  private getPoolItems(pool: SurpriseFilterPool): KeepsakeItem[] {
    switch (pool) {
      case 'new-uploads':
        return ALL_DRIVE_MEDIA_ITEMS.filter(item => isItemNewUpload(item));
      case 'videos':
        return ALL_DRIVE_MEDIA_ITEMS.filter(item => item.type === 'video');
      case 'photos':
        return ALL_DRIVE_MEDIA_ITEMS.filter(item => item.type === 'image');
      case 'all':
      default:
        return ALL_DRIVE_MEDIA_ITEMS;
    }
  }

  private refillQueue(pool: SurpriseFilterPool) {
    const items = this.getPoolItems(pool);
    // Unvisited items first
    const unvisited = items.filter(it => !this.visitedIds.has(it.id));
    if (unvisited.length > 0) {
      this.shuffledQueues[pool] = shuffleArray(unvisited.map(it => it.id));
    } else {
      // All items in this pool have been visited! Reset visited for this pool and reshuffle
      items.forEach(it => this.visitedIds.delete(it.id));
      this.shuffledQueues[pool] = shuffleArray(items.map(it => it.id));
    }
  }

  public getNextSurprise(pool: SurpriseFilterPool = 'all', excludeId?: string): {
    item: KeepsakeItem;
    milestone: Milestone;
    stats: { visitedCount: number; totalCount: number; remainingCount: number };
  } {
    const allItemsInPool = this.getPoolItems(pool);
    if (allItemsInPool.length === 0) {
      const fallback = ALL_DRIVE_MEDIA_ITEMS[0];
      return {
        item: fallback,
        milestone: convertItemToMilestone(fallback),
        stats: { visitedCount: 1, totalCount: ALL_DRIVE_MEDIA_ITEMS.length, remainingCount: 0 }
      };
    }

    if (!this.shuffledQueues[pool] || this.shuffledQueues[pool].length === 0) {
      this.refillQueue(pool);
    }

    let nextId = this.shuffledQueues[pool].shift();

    // If nextId happens to be the currently open item, pick another or put it at the back
    if (nextId && nextId === excludeId && this.shuffledQueues[pool].length > 0) {
      const altId = this.shuffledQueues[pool].shift()!;
      this.shuffledQueues[pool].push(nextId);
      nextId = altId;
    }

    if (!nextId) {
      this.refillQueue(pool);
      nextId = this.shuffledQueues[pool].shift() || allItemsInPool[0].id;
    }

    this.visitedIds.add(nextId);

    const foundItem = ALL_DRIVE_MEDIA_ITEMS.find(it => it.id === nextId) || allItemsInPool[0];
    const milestone = convertItemToMilestone(foundItem);

    // Calculate pool-specific stats
    const poolItemIds = new Set(allItemsInPool.map(it => it.id));
    let poolVisited = 0;
    this.visitedIds.forEach(id => {
      if (poolItemIds.has(id)) poolVisited++;
    });

    return {
      item: foundItem,
      milestone,
      stats: {
        visitedCount: poolVisited,
        totalCount: allItemsInPool.length,
        remainingCount: Math.max(0, allItemsInPool.length - poolVisited)
      }
    };
  }

  public resetHistory() {
    this.visitedIds.clear();
    this.refillQueue('all');
    this.refillQueue('new-uploads');
    this.refillQueue('videos');
    this.refillQueue('photos');
  }

  public getStats(pool: SurpriseFilterPool = 'all') {
    const allItemsInPool = this.getPoolItems(pool);
    const poolItemIds = new Set(allItemsInPool.map(it => it.id));
    let poolVisited = 0;
    this.visitedIds.forEach(id => {
      if (poolItemIds.has(id)) poolVisited++;
    });
    return {
      visitedCount: poolVisited,
      totalCount: allItemsInPool.length,
      remainingCount: Math.max(0, allItemsInPool.length - poolVisited)
    };
  }
}

export const surpriseMemoryManager = new SurpriseMemoryManager();
