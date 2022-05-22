import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { InMemoryNovelsRepository } from '@/infra/repositories/novels-repository/implementations/in-memory-novels-repository';
import { GetTheMostPopularNovelsUseCase } from '@/modules/novels/usecases/get-the-most-popular-novels';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';
import { generateFakeNovelsData } from '@/modules/novels/usecases/get-the-most-popular-novels/mock/generate-fake-novels-data';

describe('Get the most popular novels use case', () => {
  let inMemoryNovelsRepository: NovelsRepository;
  let getTheMostPopularNovelsUseCase: GetTheMostPopularNovelsUseCase;

  beforeAll(async () => {
    inMemoryNovelsRepository = new InMemoryNovelsRepository();
    getTheMostPopularNovelsUseCase = new GetTheMostPopularNovelsUseCase(inMemoryNovelsRepository);

    const createNovelUseCase = new CreateNovelUseCase(inMemoryNovelsRepository);

    await generateFakeNovelsData(createNovelUseCase);
  });

  it('should get the most popular novels successfully', async () => {
    const theMostPopularNovels = await getTheMostPopularNovelsUseCase.execute({});

    expect.assertions(10);

    expect(theMostPopularNovels.length).toBe(10);

    theMostPopularNovels.forEach((currentNovel, index) => {
      const nextNovel = theMostPopularNovels[index + 1];

      if (nextNovel) {
        expect(currentNovel.stars >= nextNovel.stars).toBeTruthy();
      }
    });
  });

  it('should get the most popular novels with a limit of 5', async () => {
    const theMostPopularNovels = await getTheMostPopularNovelsUseCase.execute({ limit: 5 });

    expect.assertions(5);

    expect(theMostPopularNovels.length).toBe(5);

    theMostPopularNovels.forEach((currentNovel, index) => {
      const nextNovel = theMostPopularNovels[index + 1];

      if (nextNovel) {
        expect(currentNovel.stars >= nextNovel.stars).toBeTruthy();
      }
    });
  });
});
