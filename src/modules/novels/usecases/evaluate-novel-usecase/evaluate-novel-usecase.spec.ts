import { NovelReviewsRepository } from '@/infra/repositories/novel-reviews-repository/contract-novel-reviews-repository';
import { InMemoryNovelReviewRepository } from '@/infra/repositories/novel-reviews-repository/implementations/in-memory-novel-reviews-repository';
import { NovelsRepository } from '@/infra/repositories/novels-repository/contract-novels-repository';
import { InMemoryNovelsRepository } from "@/infra/repositories/novels-repository/implementations/in-memory-novels-repository";
import { EvaluateNovelUseCase } from '@/modules/novels/usecases/evaluate-novel-usecase';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';
import { NovelDto } from '@/modules/novels/dtos/novel-dto';

describe('Evaluate novel use case', () => {
  let inMemoryNovelsRepository: NovelsRepository;
  let inMemoryNovelReviewRepository: NovelReviewsRepository;

  let evaluateNovelUseCase: EvaluateNovelUseCase;
  let createNovelUseCase: CreateNovelUseCase;

  beforeEach(() => {
    inMemoryNovelsRepository = new InMemoryNovelsRepository();
    inMemoryNovelReviewRepository = new InMemoryNovelReviewRepository();

    evaluateNovelUseCase = new EvaluateNovelUseCase(inMemoryNovelsRepository, inMemoryNovelReviewRepository);
    createNovelUseCase = new CreateNovelUseCase(inMemoryNovelsRepository);
  });

  it('should evaluate a novel successfully', async () => {
    const fakeNovelData: NovelDto = {
      title: 'Fake title',
      cover: 'Fake cover',
      sinopse: 'Fake sinopse',
      stars: 0
    }

    const novel = await createNovelUseCase.execute(fakeNovelData);

    const userId = 'Fake user id';

    await evaluateNovelUseCase.execute({ userId, novelId: novel.id, stars: 5 });

    const novelReviews = await inMemoryNovelReviewRepository.getAllNovelReviewsByNovelId(novel.id);

    expect(novelReviews.length).toBe(1);
    expect(novelReviews[0].stars).toBe(5);
  });
});
