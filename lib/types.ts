export interface MenuItem {
  item: string
  price: number
}

export interface FoodVendor {
  name: string
  description?: string
  menu: MenuItem[]
}
