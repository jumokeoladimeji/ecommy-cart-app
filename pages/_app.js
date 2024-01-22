import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { CartProvider } from "use-shopping-cart";
import { UserProvider } from '../context/UserContext';
import { CartContextProvider } from '../context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<CartProvider
				mode="payment"
				cartMode="client-only"
				// Connects to our Stripe account (stored in an .env.local file)
				stripe={
					process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
				}
				// Redirected here after successful payments (url stored in .env.local file)
				successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
				// Redirected here when you click back on Stripe Checkout (url stored in .env.local file)
				cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
				currency="USD"
				// Only customers from UK will be able to purchase
				// Having this setting means that we will capture shipping address
				allowedCountries={['US']}
				// Enables local storage
				shouldPersist={true}
				billingAddressCollection={true}
			>
				<Layout>
					<Component {...pageProps} />
					<Toaster
						position="top-center"
						reverseOrder={false}
					/>
				</Layout>
			</CartProvider>
		</UserProvider>
	);
}
