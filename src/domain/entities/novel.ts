import { randomUUID } from 'crypto';

interface NovelProps {
  title: string;
  sinopse: string;
  cover: string;
  genres: string[];
  stars: number;
}

export class Novel {
  private _id: string;
  private props: NovelProps;

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get sinopse(): string {
    return this.props.sinopse;
  }

  get cover(): string {
    return this.props.cover;
  }

  get genres(): string[] {
    return this.props.genres;
  }

  get stars(): number {
    return this.props.stars;
  }

  constructor(props: NovelProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}
