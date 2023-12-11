import { useRouter } from 'next/router';
import { NextPage } from 'next';
import ProductDetails from '../../components/ProductDetails';

const ProductPage = () => {
  const { card_id } = useParams();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
    })
  }, []);

  return (
      <div className="wrapper py-4">
        <ProductDetails pageId={card_id} />
      </div>
  );
};

export default ProductPage;