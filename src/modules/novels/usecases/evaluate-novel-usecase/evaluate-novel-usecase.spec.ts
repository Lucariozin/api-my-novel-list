import { NovelReviewsRepository } from "@/infra/repositories/novel-reviews-repository/contract-novel-reviews-repository";
import { InMemoryNovelReviewRepository } from "@/infra/repositories/novel-reviews-repository/implementations/in-memory-novel-reviews-repository";
import { NovelsRepository } from "@/infra/repositories/novels-repository/contract-novels-repository";
import { InMemoryNovelsRepository } from "@/infra/repositories/novels-repository/implementations/in-memory-novels-repository";

describe('Evaluate novel use case', () => {
  let inMemoryNovelsRepository: NovelsRepository;
  let inMemoryNovelReviewRepository: NovelReviewsRepository;

  beforeEach(() => {
    inMemoryNovelsRepository = new InMemoryNovelsRepository();
    inMemoryNovelReviewRepository = new InMemoryNovelReviewRepository();
  });

  it('should evaluate a novel successfully');
});
