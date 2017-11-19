export class Filter {
  constructor(
    public wineFilter: Array<Object>,
    public countryFilter: Array<Object>,
    public wineFilterValue: String,
    public priceSort: Number,
    public letterSort: Number,
    public alcSort: Number,
    public limit: Number,
    public searchValue: String,
  ){}
}
