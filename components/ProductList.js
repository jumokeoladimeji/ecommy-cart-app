import Product from "@/components/Product";
import CarouselList from "@/components/Carousel";

import { products } from "@/data/messages";

// not in use

export default function ProductList() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center mx-auto gap-4 place-center flex-wrap w-100 md:max-w-[900px]">
              
              <div><CarouselList />
    Cards list
    </div>
          {products.map((product) => (
              <Product product={product} key={product.id} />
          ))}
      </div>
  );
}
