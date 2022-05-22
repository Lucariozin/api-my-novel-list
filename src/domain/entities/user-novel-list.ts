import { randomUUID } from 'crypto';
import { Novel } from '@/domain/entities/novel';

interface UserNovelListProps {
  userId: string;
  novelList: Novel[];
}

export class UserNovelList {
  private _id: string;
  private props: UserNovelListProps;

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get novelList(): Novel[] {
    return this.props.novelList;
  }

  constructor(props: UserNovelListProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}
