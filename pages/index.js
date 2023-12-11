import { getCategories } from "@/pages/api/category";
import Category from "@/components/Category";
import CarouselList from "@/components/Carousel";


export default function Home({ categories }) {
  // console.log('orv=====2', process.env)
  // var result = categories.map(category =>
  //   category.cards.map(card => ({ parentId: category.id, ...card }))
  // ).flat();

  return (
   <div className="bg-white">
    {/* <CarouselList cards={result}/> */}
    <div>
      {categories.map((category) => (
        <Category category={category} key={category.id} />
      ))}
    </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const categories = await getCategories(process.env);
  return { props: { categories } };
}