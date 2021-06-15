interface ItemData {
    id: string,
    name: string,
    description: string,
    thumbnail: string,
    category: string,
    sellers: SellerWithItemSelected[]
}

interface SellerWithItemSelected {
    name: string,
    id: string,
    price: number,
    stock: number
}