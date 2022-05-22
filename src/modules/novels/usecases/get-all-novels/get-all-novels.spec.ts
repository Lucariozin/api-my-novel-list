import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { InMemoryNovelsRepository } from '@/infra/repositories/novels-repository/implementations/in-memory-novels-repository';
import { GetAllNovelsUseCase } from '@/modules/novels/usecases/get-all-novels';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';

describe('Get all novels use case', () => {
  let inMemoryNovelsRepository: NovelsRepository;
  let getAllNovelsUseCase: GetAllNovelsUseCase;

  const fakeNovelData: NovelDto = {
    title: 'Fake title',
    cover: 'Fake cover',
    sinopse: 'Fake sinopse',
    genres: ['Fake genre'],
    stars: 0
  };

  beforeEach(async () => {
    inMemoryNovelsRepository = new InMemoryNovelsRepository();
    getAllNovelsUseCase = new GetAllNovelsUseCase(inMemoryNovelsRepository);

    const createNovelUseCase = new CreateNovelUseCase(inMemoryNovelsRepository);

    await createNovelUseCase.execute(fakeNovelData);
  });

  it('should get all novels succesfully', async () => {
    const allNovels = await getAllNovelsUseCase.execute();

    expect(allNovels.length).toBe(1);
  });
});
