import Product from "@/components/Product";

export default function Category({ category }) {
  const { name, cards } = category;
  const newCardsArr = cards.map(({
    stripe_product_id: id,
    id: card_id,
    ...rest
  }) => ({
    id,
    card_id,
    ...rest
  }));

  return (
    <div className="text-center">  
      <p className="text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2 decoration-emerald-500">
        {name}
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center mx-auto gap-4 place-center flex-wrap w-100 md:max-w-[900px]">
    
      {newCardsArr.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      </div>
    </div>

  );
}
