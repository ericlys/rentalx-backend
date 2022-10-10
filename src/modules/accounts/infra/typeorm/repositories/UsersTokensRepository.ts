import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { dataSource } from "@shared/infra/typeorm";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UserTokens);
  }

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersToken = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
