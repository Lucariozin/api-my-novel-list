import { NovelsRepository } from "@/infra/repositories/novels-repository/contract-novels-repository";

export class GetAllNovelsUseCase {
  constructor(
    private readonly novelsRepository: NovelsRepository,
  ) {}

  async execute() {
    const allNovels = await this.novelsRepository.getAllNovels();

    return allNovels;
  }
}
