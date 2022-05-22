import { Novel } from '@/domain/entities/novel';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';

interface Params {
  limit?: number;
}

export class GetTheMostPopularNovelsUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
  ) {}

  async execute({ limit = 10 }: Params): Promise<Novel[]> {
    const novels = await this.novelsRepository.getAllNovels();

    const theMostPopularNovels = novels.sort((a, b) => b.stars - a.stars).splice(0, limit);

    return theMostPopularNovels;
  }
}
