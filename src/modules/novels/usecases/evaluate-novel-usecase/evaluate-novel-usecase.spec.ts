import { NovelReviewsRepository } from '@/infra/repositories/novel-reviews-repository/contract-novel-reviews-repository';
import { InMemoryNovelReviewsRepository } from '@/infra/repositories/novel-reviews-repository/implementations/in-memory-novel-reviews-repository';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { InMemoryNovelsRepository } from "@/infra/repositories/novels-repository/implementations/in-memory-novels-repository";
import { EvaluateNovelUseCase } from '@/modules/novels/usecases/evaluate-novel-usecase';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';
import { Novel } from '@/domain/entities/novel';

interface FakeData {
  novel: NovelDto;
  userId: string;
}

describe('Evaluate novel use case', () => {
  let inMemoryNovelsRepository: NovelsRepository;
  let inMemoryNovelReviewsRepository: NovelReviewsRepository;

  let evaluateNovelUseCase: EvaluateNovelUseCase;
  let createNovelUseCase: CreateNovelUseCase;

  let fakeNovel: Novel;

  const fakeData: FakeData = {
    novel: {
      title: 'Fake title',
      cover: 'Fake cover',
      sinopse: 'Fake sinopse',
      stars: 0
    },
    userId: 'Fake user id'
  };

  beforeEach(async () => {
    inMemoryNovelsRepository = new InMemoryNovelsRepository();
    inMemoryNovelReviewsRepository = new InMemoryNovelReviewsRepository();

    evaluateNovelUseCase = new EvaluateNovelUseCase(inMemoryNovelsRepository, inMemoryNovelReviewsRepository);
    createNovelUseCase = new CreateNovelUseCase(inMemoryNovelsRepository);

    fakeNovel = await createNovelUseCase.execute(fakeData.novel);
  });

  it('should evaluate a novel successfully', async () => {
    expect.assertions(2);

    await evaluateNovelUseCase.execute({ userId: fakeData.userId, novelId: fakeNovel.id, stars: 5 });

    const novelReviews = await inMemoryNovelReviewsRepository.getAllNovelReviewsByNovelId(fakeNovel.id);
    const { stars } = await inMemoryNovelsRepository.getNovelById(fakeNovel.id);

    expect(novelReviews.length).toBe(1);
    expect(stars).toBe(5);
  });

  it("should doesn't evaluate a novel with invalid stars", async () => {
    expect.assertions(3);

    expect(async () => {
      await evaluateNovelUseCase.execute({ userId: fakeData.userId, novelId: fakeNovel.id, stars: 6 });
    }).rejects.toThrow('The stars must be between 0 and 5.');

    const novelReviews = await inMemoryNovelReviewsRepository.getAllNovelReviewsByNovelId(fakeNovel.id);
    const { stars } = await inMemoryNovelsRepository.getNovelById(fakeNovel.id);

    expect(novelReviews.length).toBe(0);
    expect(stars).toBe(0);
  });
});
