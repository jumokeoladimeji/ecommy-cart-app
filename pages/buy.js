import { getCategories } from "@/pages/api/category";
import Category from "@/components/Category";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function Buy({ categories }) {
	const { user, token, loginUser, logoutUser } =
		useContext(UserContext);
	
	const router = useRouter();


	return (
		<div className="bg-[#fff] pt-10 md:pt-0">
			<div className="px-5 md:px-10 text-center ">
				<h1 className="font-bold text-2xl pt-5">
					Buy a dozen cards... only pay for 10!
				</h1>
				<p className="text-gray-500 text-md pt-4 font-bold leading-relaxed block">
					Tell us how many of each…. “fish” and “golf”
					rulers you need to make 12, we’ll ship them
					and your envelopes to you FREE.
				</p>
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
