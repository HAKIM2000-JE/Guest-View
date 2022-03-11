import {UpsaleProductDto} from "./UpsaleProductDto";

export class UpsaleCategoryAndProductDto {
  categoryId: string;
  parentCategoryId: string;
  categoryPictureUrl: string;
  categoryTitle: string;
  categoryDescription: string;
  products: UpsaleProductDto[];
}
