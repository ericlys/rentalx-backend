import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRespository } from "../../repositories/IUsersRespository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRespository: IUsersRespository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRespository.crete({
      name,
      email,
      driver_license,
      password,
    });
  }
}

export { CreateUserUseCase };
