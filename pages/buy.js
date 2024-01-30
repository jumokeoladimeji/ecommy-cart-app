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
		<div className="bg-[#fff]">
			<div className="px-5 md:px-10">
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
