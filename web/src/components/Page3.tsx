import React from 'react' 
import { Typeahead } from 'react-bootstrap-typeahead';

interface Page3Props {
    setImages: React.Dispatch<any>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setFileCount: React.Dispatch<React.SetStateAction<number>>,
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    fileCount: number,
    images: any,
    tags: string[]
}

export const Page3: React.FC<Page3Props> = ({setImages, setPage, setFileCount, fileCount, images, setTags, tags}) =>{
        return (
        <div className="flex">
            <div className="w-5/12">
                <img src="https://images.unsplash.com/photo-1592628824156-c6f2677d3bd5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGd1ZXN0JTIwaG91c2V8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="w-full h-auto" />
            </div>
            <div className="w-7/12 p-32">
             <div className="w-10/12 border border-gray-200 box-shadow p-2 my-2" >
             <Typeahead
               allowNew
               id="custom-selections-example"
               multiple
               options={[]}
               placeholder="You can add tags for more chances to get rewards"
               onChange={setTags}
             />
             </div>
             <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setImages([...images, e.target.files[0]])
             }}/>
             <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
             { fileCount > 1 && (
                 <>
                   <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setImages([...images, e.target.files[0]])
                }}/>
                <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
                </>
             )}
             { fileCount > 2 && (
                 <>
                  <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setImages([...images, e.target.files[0]])
                }}/>
                 <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
                </>
             )}
             { fileCount > 3 && (
                 <>
                  <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setImages([...images, e.target.files[0]])
                }} />
                </>
             )}

             <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" type="submit">Register</button>
             <button className="w-7/12 mx-auto p-2 bg-gray-500 text-white mt-2" onClick={() => setPage(prev => prev  - 1)}>Back </button>
            </div>
        </div>
        );
}