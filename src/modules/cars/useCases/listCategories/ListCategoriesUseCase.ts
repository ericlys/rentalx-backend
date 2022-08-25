import { Category } from "../../model/Category";
import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRespository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
