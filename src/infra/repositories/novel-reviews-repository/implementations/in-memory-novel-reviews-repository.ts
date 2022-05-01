import { NovelReview } from "@/domain/entities/novel-review";
import { NovelReviewsRepository } from "@/infra/repositories/novel-reviews-repository/contract-novel-reviews-repository";

export class InMemoryNovelReviewRepository implements NovelReviewsRepository {
  private readonly novelReviews: NovelReview[] = [];

  async getAllReviewsByNovelId(novelId: string): Promise<NovelReview[]> {
    const reviews = this.novelReviews.filter((novelReview) => {
      if (novelReview.novelId === novelId) return novelReview;
    });

    return reviews;
  }

  async create(data: NovelReview): Promise<NovelReview> {
    this.novelReviews.push(data);

    return data;
  }
}
