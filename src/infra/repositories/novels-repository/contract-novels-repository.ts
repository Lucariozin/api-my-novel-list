import { Novel } from "@/domain/entities/novel";

export interface NovelsRepository {
  create: (data: Novel) => Promise<Novel>;
  update: (novelId: string, data: Novel) => Promise<Novel | null>;
  getNovelById: (novelId: string) => Promise<Novel | null>;
  getNovelByTitle: (title: string) => Promise<Novel | null>;
}
