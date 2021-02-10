import { gql } from 'apollo-boost';
import React, { useState } from 'react' 
import { GoSearch } from 'react-icons/go';

interface SearchProps {

}

const SearchQuery = gql`
  query SearchQuery {
    searchPost {
      name
      country
      city
      images
      price
    }
  }
`

export const Search: React.FC<SearchProps> = ({}) =>{
    const [ text, setText ] = useState("");
    return (
        <div className="w-3/6 mx-auto my-6">
         <form className="flex w-full border border-gray-200 rounded-xl p-3">
          <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} value={text} placeholder="Search...." className="w-11/12" />
          <button className="w-1/12">
            <GoSearch style={{ paddingLeft:'3px', fontSize: '30px'}} />
          </button>
         </form>
       </div>
    );
}