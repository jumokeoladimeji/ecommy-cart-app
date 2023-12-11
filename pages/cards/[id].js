import { useRouter } from 'next/router';
import ProductDetails from '../../components/ProductDetails';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
      <div className="wrapper py-4">
        <ProductDetails pageId={id} />
      </div>
  );
};

export default ProductPage;