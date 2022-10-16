import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRespository } from "@modules/accounts/repositories/IUsersRespository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRespository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
