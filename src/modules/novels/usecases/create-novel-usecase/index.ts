import { Novel } from '@/domain/entities/novel';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';

export class CreateNovelUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
  ) {}

  async execute({ stars, title, ...rest }: NovelDto) {
    if (stars < 0 || stars > 5) {
      throw new Error('The stars must be between 0 and 5.');
    }

    const novelAlreadyExists = await this.novelsRepository.getNovelByTitle(title);

    if (novelAlreadyExists) {
      throw new Error('There is already a novel with the same title.');
    }

    const newNovel = new Novel({ stars, title, ...rest });

    const createdNovel = await this.novelsRepository.create(newNovel);

    return createdNovel;
  }
}
