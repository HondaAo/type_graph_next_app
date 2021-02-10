import React from 'react' 
import { Typeahead } from 'react-bootstrap-typeahead';
interface Page2Props {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setAmenities: React.Dispatch<React.SetStateAction<string[]>>,
    setComment: React.Dispatch<React.SetStateAction<string>>
}

export const Page2: React.FC<Page2Props> = ({setPage, setAmenities, setPrice, setComment}) =>{
    const options = [ "Wi-fi  ", "TV  ", "Landry  ", "Air Conditionar  ", "Fridge  "]
        return (
        <div className="flex">
            <div className="w-7/12 p-32">
             <h2>Step 2</h2>
             <input type="number" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="price" value={30} onChange={(e) => setPrice(e.target.valueAsNumber)} />{"$"}
             <div className="w-10/12 border border-gray-200 box-shadow p-2 my-2">
             <Typeahead placeholder="Choose several amenities..." multiple onChange={setAmenities} options={options}  />
             </div>
             <textarea className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" onChange={(e) => setComment(e.target.value)} placeholder="other detail" ></textarea>
             <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" onClick={() => setPage(prev => prev + 1 )}>Proceed to next step</button>
             <button className="w-7/12 mx-auto p-2 bg-gray-500 text-white mt-2" onClick={() => setPage(prev => prev - 1)}>Back </button>
            </div>
            <div className="w-5/12">
                <img src="https://images.unsplash.com/photo-1604040427842-0bdb35676f66?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGd1ZXN0JTIwaG91c2V8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="w-full h-auto" />
            </div>
        </div>
        );
}