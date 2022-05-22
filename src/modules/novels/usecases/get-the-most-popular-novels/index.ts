import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';

export class GetTheMostPopularNovelsUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
  ) {}

  async execute() {
    const novels = await this.novelsRepository.getAllNovels();

    const theMostPopularNovels = novels.sort((a, b) => b.stars - a.stars).splice(0, 10);

    return theMostPopularNovels;
  }
}
