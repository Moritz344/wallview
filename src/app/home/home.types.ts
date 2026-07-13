export interface SearchParameter {
  q: string,
  categories: [{ name: string,isChecked: boolean }],
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
