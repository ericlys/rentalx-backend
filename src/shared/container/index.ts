import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRespository } from "@modules/accounts/repositories/IUsersRespository";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRespository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRespository>(
  "UsersRepository",
  UsersRepository
);
