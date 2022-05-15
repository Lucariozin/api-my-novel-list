import { Novel } from '@/domain/entities/novel';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';

export class InMemoryNovelsRepository implements NovelsRepository {
  private novels: Novel[] = [];

  async create(data: Novel): Promise<Novel> {
    this.novels.push(data);

    return data;
  }

  async update(novelId: string, data: Novel): Promise<Novel | null> {
    let updateSuccessfully = false;

    const newNovels = this.novels.map((novel) => {
      if (novel.id === novelId) {
        updateSuccessfully = true;
        return data;
      }

      return novel;
    });

    this.novels = newNovels;

    return updateSuccessfully ? data : null;
  }

  async getNovelById(novelId: string): Promise<Novel | null> {
    const novel = this.novels.find((novel) => novel.id === novelId);

    return novel;
  }

  async getNovelByTitle(title: string): Promise<Novel | null> {
    const novel = this.novels.find((novel) => novel.title === title);

    return novel;
  }
}
