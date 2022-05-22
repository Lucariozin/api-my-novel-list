import { Novel } from "@/domain/entities/novel";
import { UserNovelList } from "@/domain/entities/user-novel-list";

export interface UsersNovelListRepository {
  createUserNovelList: (data: UserNovelList) => Promise<UserNovelList>;
  addNovelToUserNovelList: (userId: string, novel: Novel) => Promise<Novel>;
  removeNovelFromUserNovelList: (userId: string, novelId: string) => Promise<void>;
  getUserNovelListByUserId: (userId: string) => Promise<UserNovelList>;
}
