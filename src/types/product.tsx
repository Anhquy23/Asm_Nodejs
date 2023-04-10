export interface IProduct {
  onUpdate(data: { products: IProduct[]; onUpdate: (_id: number) => void; id: IProduct[]; _id: string | undefined; }): unknown;
  _id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number | string;
}
