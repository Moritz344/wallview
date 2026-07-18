export interface SearchParameter {
  q: string,
  categories: WallpaperCategories[],
  category: string,
  purity: string,
  sorting: string,
  order: string,
  topRange: string,
  atleast: string,
  resolution: string[],
  page: number
}

export interface WallpaperFile {
  name: string,
  path: string,
  created: number,
  modified: number
}

export interface WallpaperCategories {
  name: string,
  value: string,
  isChecked: boolean,
}
