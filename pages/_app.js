import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { CartProvider } from "use-shopping-cart";
import { UserProvider } from '../context/UserContext';
import { CartContextProvider } from '../context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<CartContextProvider>
				<Layout>
					<Component {...pageProps} />
					<Toaster
						position="top-center"
						reverseOrder={false}
					/>
				</Layout>
			</CartContextProvider>
		</UserProvider>
	);
}
