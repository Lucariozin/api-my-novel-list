import { Novel } from '@/domain/entities/novel';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';

export class CreateNovelUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
  ) {}

  async execute(data: NovelDto) {
    const novelAlreadyExists = await this.novelsRepository.getNovelByTitle(data.title);

    if (novelAlreadyExists) {
      throw new Error('There is already a novel with the same title.');
    }

    const newNovel = new Novel(data);

    const createdNovel = await this.novelsRepository.create(newNovel);

    return createdNovel;
  }
}
