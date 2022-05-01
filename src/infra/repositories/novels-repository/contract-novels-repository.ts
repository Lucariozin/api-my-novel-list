import { Novel } from "@/domain/entities/novel";

export interface NovelsRepository {
  getNovelById: (novelId: string) => Promise<Novel | null>;
  update: (novelId: string, data: Novel) => Promise<Novel | null>;
}
