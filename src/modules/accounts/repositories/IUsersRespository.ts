import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRespository {
  crete(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRespository };
