import Head from "next/head";
import NavBar from "./NavBar";
import Footer from './Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function Layout({ children }) {
  return (
		<>
			<Head>
				<title>Measures of Fun</title>
				<meta name="description" content="Finally, a greeting card you don’t throw away!" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="p:domain_verify"
					content="a22f39306c4484dfcfdb43f59bd04800"
				/>
				<link rel="icon" href="#" />
			</Head>
			<NavBar />
			<main className="bg-[#fff] min-h-[calc(100vh-76px)] px-0 pt-20 md:px-10 md:pt-28">
				<GoogleAnalytics
					gaId={process.env.NEXT_PUBLIC_GA_ID}
				/>
				<div className="container md:mx-auto md:max-w-[1250px]">
					{children}
				</div>
			</main>
			<Footer />
		</>
	);
}
