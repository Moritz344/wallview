import { Injectable,signal,inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";



@Injectable({
  providedIn: 'root',
})
export class Wallhaven {
  private http = inject(HttpClient);
  public baseUrl = signal<string>("https://wallhaven.cc/api/v1");

  public readonly categories = signal<string[]>(["anime","general","people"])
  public readonly sorting = signal<string[]>(["date_added"," relevance", "random"," views", "favorites", "toplist"])
  public readonly orders = signal<string[]>(["asc","desc"]);
  public readonly resolutions = signal<string[]>([
    "1920x1080",
    "1920x1200",
    "2560x1440",
    "2560x1600",
    "3840x2160",
    "1920x1440",
    "2560x1080",
    "3440x1440",
    "3840x1600",
  ]);

  constructor() {}

  search(searchParameter: any) {
    // TODO: make api request to search for wallpapers with electron instead
    const params = new URLSearchParams();
    params.append("q",searchParameter.q);
    params.append("sorting",searchParameter.sorting);
    params.append("order",searchParameter.order);
    params.append("page",searchParameter.page);
    params.append("categories",
          searchParameter.categories
                  .filter((category: any) => category.isChecked)
                  .map((c: any) => c.name.toLowerCase())
                  .join(",")
    )
    params.append("resolution",searchParameter.resolution);

    const url = this.baseUrl() + "/search?" + params.toString();

    return this.http.get(url)
  }


}
