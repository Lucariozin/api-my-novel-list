import { randomUUID } from 'crypto';

interface NovelReviewProps {
  userId: string;
  novelId: string;
  stars: number;
}

export class NovelReview {
  private _id: string;
  private props: NovelReviewProps;

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get novelId(): string {
    return this.props.novelId;
  }

  get stars(): number {
    return this.props.stars;
  }

  constructor(props: NovelReviewProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}
