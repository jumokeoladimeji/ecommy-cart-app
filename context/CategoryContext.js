import { createContext, useState, useEffect } from 'react';

import { getCategories } from "@/pages/api/category";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getCategories();
          setCategories(data)
        }
      
        fetchData()
          .catch(console.error);
    }, [])

    return (
        <CategoriesContext.Provider
            value={{ categories }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};