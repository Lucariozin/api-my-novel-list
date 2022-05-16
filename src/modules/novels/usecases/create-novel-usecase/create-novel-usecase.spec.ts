import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { InMemoryNovelsRepository } from '@/infra/repositories/novels-repository/implementations/in-memory-novels-repository';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';

describe('Create novel use case', () => {
  it('should to create a novel succesfully.', async () => {
    const inMemoryNovelsRepository: NovelsRepository = new InMemoryNovelsRepository();
    const createNovelUseCase: CreateNovelUseCase = new CreateNovelUseCase(inMemoryNovelsRepository);
    
    const fakeNovelData: NovelDto = {
      title: 'Fake title',
      cover: 'Fake cover',
      sinopse: 'Fake sinopse',
      stars: 0
    }

    expect.assertions(1);

    try {
      await createNovelUseCase.execute(fakeNovelData);

      const novelHasBeenCreated = await inMemoryNovelsRepository.getNovelByTitle(fakeNovelData.title);

      expect(novelHasBeenCreated).toBeTruthy();
    } catch {}
  });
});
