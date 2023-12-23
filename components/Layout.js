import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
		<>
			<Head>
				<title>The Card Company</title>
				<meta
					name="description"
					content="A simple website to show how to use use-shopping-cart"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="#" />
			</Head>
			<NavBar />
			<main className="bg-[#fff] min-h-[calc(100vh-76px)] px-0 pt-20 md:px-10 md:pt-28">
				<div className="container md:mx-auto md:max-w-[1250px]">
					{children}
				</div>
			</main>
		</>
	);
}
