import { NovelDto } from '@/modules/novels/dtos/novel-dto';
import { CreateNovelUseCase } from '@/modules/novels/usecases/create-novel-usecase';

const fakeNovelsData: NovelDto[] = [
  {
    title: 'Fake title 1',
    cover: 'Fake cover 1',
    sinopse: 'Fake sinopse 1',
    stars: 5
  },
  {
    title: 'Fake title 2',
    cover: 'Fake cover 2',
    sinopse: 'Fake sinopse 2',
    stars: 4
  },
  {
    title: 'Fake title 3',
    cover: 'Fake cover 3',
    sinopse: 'Fake sinopse 3',
    stars: 4.2
  },
  {
    title: 'Fake title 4',
    cover: 'Fake cover 4',
    sinopse: 'Fake sinopse 4',
    stars: 1
  },
  {
    title: 'Fake title 5',
    cover: 'Fake cover 5',
    sinopse: 'Fake sinopse 5',
    stars: 0
  },
  {
    title: 'Fake title 6',
    cover: 'Fake cover 6',
    sinopse: 'Fake sinopse 6',
    stars: 5
  },
  {
    title: 'Fake title 7',
    cover: 'Fake cover 7',
    sinopse: 'Fake sinopse 7',
    stars: 3.5
  },
  {
    title: 'Fake title 8',
    cover: 'Fake cover 8',
    sinopse: 'Fake sinopse 8',
    stars: 4.7
  },
  {
    title: 'Fake title 9',
    cover: 'Fake cover 9',
    sinopse: 'Fake sinopse 9',
    stars: 4.7
  },
  {
    title: 'Fake title 10',
    cover: 'Fake cover 10',
    sinopse: 'Fake sinopse 10',
    stars: 2
  },
  {
    title: 'Fake title 11',
    cover: 'Fake cover 11',
    sinopse: 'Fake sinopse 11',
    stars: 2.2
  },
];

export async function generateFakeNovelsData(createNovelUseCase: CreateNovelUseCase): Promise<void> {
  for (const fakeNovel of fakeNovelsData) {
    await createNovelUseCase.execute(fakeNovel);
  }
}
