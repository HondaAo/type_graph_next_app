import React from 'react' 

interface Page1Props {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setAdress: React.Dispatch<React.SetStateAction<string>>,
    setPostalcode: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    postalcode: string,
    address: string
}

export const Page1: React.FC<Page1Props> = ({setPage, setName, setAdress, setPostalcode, name, postalcode, address}) =>{
        return (
            <div className="flex">
                <div className="w-5/12">
                    <img src="https://images.unsplash.com/photo-1595521624742-47e90260edab?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGd1ZXN0JTIwaG91c2V8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="w-full h-auto" />
                </div>
                <div className="w-7/12 p-32">
                    <h1>Step 1</h1>
                    <input type="text" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    <input type="text" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Postal code" onChange={(e) => setPostalcode(e.target.value)} value={postalcode} />
                    <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Address" onChange={(e) => setAdress(e.target.value)} value={address}/>
                    <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" onClick={(e) => setPage(prev => prev + 1 )}>Proceed to next stap</button>
                    <button className="w-7/12 mx-auto p-2 bg-gray-500 text-white mt-2" onClick={() => setPage(prev => prev  - 1)}>Back </button>
                </div>
            </div>
        );
}