import { SelectedImgType } from "@/app/producto/[productId]/ProductDetails";

export interface ProductType {
  id: string;
  name: string;
  images: SelectedImgType[];
}