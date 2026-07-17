export interface SearchParameter {
  q: string,
  categories: WallpaperCategories[],
  purity: number,
  sorting: string,
  order: string,
  topRange: string,
  atleast: string,
  resolution: string,
  page: number
}

export interface WallpaperFile {
  name: string,
  path: string
}

export interface WallpaperCategories {
  name: string,
  isChecked: boolean
}
