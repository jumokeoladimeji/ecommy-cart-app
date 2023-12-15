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
			<p
				style={{ fontFamily: 'Lobster Two' }}
				className="text-3xl font-bold capitalize decoration-2 decoration-emerald-500 mb-5"
			>
				{name} cards
			</p>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mx-auto gap-4 place-center flex-wrap w-100 md:max-w-[1200px]">
				{newCardsArr.map((product) => (
					<Product product={product} key={product.id} />
				))}
				{newCardsArr.map((product) => (
					<Product product={product} key={product.id} />
				))}
				{newCardsArr.map((product) => (
					<Product product={product} key={product.id} />
				))}
				{newCardsArr.map((product) => (
					<Product product={product} key={product.id} />
				))}
			</div>
		</div>
	);
}
