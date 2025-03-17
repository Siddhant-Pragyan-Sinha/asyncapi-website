// ToolDataType.ts
export interface Tag {
  name: string;
  color: string;
  borderColor: string;
}

export interface TagItem {
  name: string;
  color: string;
  borderColor: string;
}

export interface ToolLinks {
  websiteUrl: string;
  repoUrl?: string;
  docsUrl?: string;
}

export interface ToolFilters {
  language?: Tag[];
  technology?: Tag[];
  categories?: string[];
  hasCommercial?: boolean;
}

export interface ToolData {
  title: string;
  description: string;
  links: ToolLinks;
  filters: ToolFilters;
}

export interface CategoryData {
  description: string;
  toolsList: ToolData[];
}

export interface CombinedToolData {
  [category: string]: CategoryData;
}

type VisibleDataListType = {
  lang: boolean;
  tech: boolean;
  category: boolean;
  pricing: boolean;
  ownership: boolean;
  desc: boolean;
};

type ToolCategory = {
  name: string;
  description: string;
};

type Language = {
  name: string;
  popularity: number;
};

type Technology = {
  name: string;
  type: string;
};

export default ToolData;
export type { VisibleDataListType, ToolCategory, Language, Technology };
