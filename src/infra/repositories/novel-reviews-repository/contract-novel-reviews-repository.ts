import { NovelReview } from "@/domain/entities/novel-review";

export interface NovelReviewsRepository {
  getAllReviewsByNovelId: (novelId: string) => Promise<NovelReview[]>;
  create: (data: NovelReview) => Promise<NovelReview>;
}
