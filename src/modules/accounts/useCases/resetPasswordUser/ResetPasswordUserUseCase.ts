import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRespository } from "@modules/accounts/repositories/IUsersRespository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRespository: IUsersRespository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRespository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRespository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
