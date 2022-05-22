import { Novel } from '@/domain/entities/novel';
import { UserNovelList } from '@/domain/entities/user-novel-list';
import { UsersNovelListRepository } from '@/infra/repositories/users-novel-list-repository/contract-users-novel-list-repository';

export class InMemoryUsersNovelListRepository implements UsersNovelListRepository {
  private usersNovelList: UserNovelList[] = [];

  async createUserNovelList(data: UserNovelList): Promise<UserNovelList> {
    this.usersNovelList.push(data);

    return data;
  }

  async addNovelToUserNovelList(userId: string, novel: Novel): Promise<Novel> {
    const newUsersNovelList = this.usersNovelList.map((userNovelList) => {
      if (userNovelList.userId === userId) {
        const newUserNovelList = new UserNovelList({
          novelList: [...userNovelList.novelList, novel],
          userId
        }, userNovelList.id);

        return newUserNovelList;
      }

      return userNovelList;
    });

    this.usersNovelList = newUsersNovelList;

    return novel;
  }

  async removeNovelFromUserNovelList(userId: string, novelId: string): Promise<void> {
    const newUsersNovelList = this.usersNovelList.map((userNovelList) => {
      if (userNovelList.userId === userId) {
        const newNovelList = userNovelList.novelList.map((novel) => {
          if (novel.id !== novelId) return novel;
        });

        const newUserNovelList = new UserNovelList({
          novelList: newNovelList,
          userId
        }, userNovelList.id);

        return newUserNovelList;
      }

      return userNovelList;
    });

    this.usersNovelList = newUsersNovelList;
  }

  async getUserNovelListByUserId(userId: string): Promise<UserNovelList> {
    const userNovelList = this.usersNovelList.find((userNovelList) => userNovelList.userId === userId);

    return userNovelList;
  }
}
