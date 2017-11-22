export class Filter {
  constructor(
    public wineFilter: Array<Object>,
    public countryFilter: Array<Object>,
    public wineFilterValue: String,
    public sortKey: String,
    public sortValue: Number,
    public limit: Number,
    public searchArray: Array<String>,
    public searchValue: String,
  ){}
}
