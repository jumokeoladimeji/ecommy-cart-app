import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

//   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (keyword.length > 0) {
//       router.push(`/search/${keyword.trim()}`);
//     }
//   };
function searchOnChange(e){
  setQuery(e.target.value)
}

function searchOnKeyPress(e){
  if(e.key === 'Enter'){
      searchQuery(query)       
  }
}

function searchIconOnClick(e){
  searchQuery(query)       
}

async function searchQuery(query){
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       search_term: query,
  //     })
  //   };
  
  // var products
  // // const response = await fetch(`${process.env.EXTERNAL_HOST}/api/v1/search`, requestOptions)
  // const response = await fetch(`/api/v1/search`, requestOptions)
  // .then(res=>res.json())
  // .then((responseJson)=>{
  //   products = responseJson["data"]
  //   dispatch(updateProducts(products))
  //   console.log("SEARCH BAR PRODUCT: ", products)
  // })
  // .catch((error)=>{
  //   products=[]
  //   console.log(error)      
  // });

}

return (
    <div className="ml-5 flex w-[30%] items-center justify-between">
      <input
        type="search"
        className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search Cards..."
        aria-label="Search"
        aria-describedby="button-addon2"
        onChange={(e) => searchOnChange(e)} onKeyPress={(e) => searchOnKeyPress(e)} 
        />


      <span
        onClick={ searchIconOnClick }
        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
        id="basic-addon2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5">
          <path
          //   fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          //   clip-rule="evenodd" 
            />
        </svg>
      </span>
    </div>
  );
};

export default SearchBox;
