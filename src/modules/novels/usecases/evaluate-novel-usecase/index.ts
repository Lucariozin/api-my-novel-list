import { Novel } from "@/domain/entities/novel";
import { NovelReview } from "@/domain/entities/novel-review";
import { NovelReviewsRepository } from "@/infra/repositories/novel-reviews-repository/contract-novel-reviews-repository";
import { NovelsRepository } from "@/infra/repositories/novels-repository/contract-novels-repository";
import { EvaluateNovelDto } from '@/modules/novels/dtos/evaluate-novel-dto';

export class EvaluateNovelUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
    private readonly novelReviewRepository: NovelReviewsRepository
  ) {}

  async execute({ userId, novelId, stars }: EvaluateNovelDto): Promise<Novel> {
    if (stars < 0 || stars > 5) {
      throw new Error('The stars must be between 0 and 5.');
    }
    
    const novel = await this.novelsRepository.getNovelById(novelId);

    if (!novel) {
      throw new Error('Novel does not exists.');
    }

    const newReview = new NovelReview({ userId, novelId, stars });
    await this.novelReviewRepository.create(newReview);

    const allReviews = await this.novelReviewRepository.getAllNovelReviewsByNovelId(novel.id);

    const novelStars = this.calculateNovelStars(allReviews);

    const newNovel = new Novel({
      title: novel.title,
      cover: novel.cover,
      sinopse: novel.sinopse,
      genres: novel.genres,
      stars: novelStars,
    }, novel.id);

    await this.novelsRepository.update(novel.id, newNovel);

    return newNovel;
  }

  private calculateNovelStars(allReviews: NovelReview[]): number {
    return (allReviews.map(({ stars }) => stars).reduce((stars, ac) => ac + stars, 0)) / allReviews.length;
  }
}
