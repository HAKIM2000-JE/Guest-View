export class Hygiene {
  id: string;
  language: string;
  categoryTranslations: CategoryTranslation[];
}
export class CategoryTranslation {
  name: string;
  categoryItems: CategoryItem[];
}
export class CategoryItem {
  itemCode: string;
  title: string;
  description: string;
}

