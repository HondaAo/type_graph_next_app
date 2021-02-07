import React, { useState } from 'react' 
import { Layout } from 'src/components/layout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { CreatePostMutation, CreatePostMutationVariables } from 'src/schemaTypes';
import {useRouter} from 'next/router'
import { Typeahead } from 'react-bootstrap-typeahead';
interface hostProps {

}

const createPostMutation = gql`
 mutation CreatePostMutation($name: String!, $country: String!, $city: String!, $address: String!, $price: Int!, $beds: String!,$comment: String!, $postalcode: String!, $amenities: [String!], $tags: [String!], $images: [String!]) {
    register(name: $name, country: $country, city: $city, address: $address, comment: $comment,  price: $price, beds: $beds, postalcode: $postalcode, amenities: $amenities, tags: $tags, images: $images)
 }
`

 

const Host: React.FC<hostProps> = ({}) =>{
    const [ page, setPage ] = useState(0);
    const [ name, setName ] = useState("");
    const [ comment, setComment ] = useState("");
    const [ country, setCountry ] = useState("")
    const [ city, setCity ] = useState("")
    const [ address, setAdress ] = useState("")
    const [ price, setPrice ] = useState(30)
    const [ beds, setBeds ] = useState("2") 
    const [ postalcode, setPostalcode ] = useState("")
    const [ amenities, setAmenities ] = useState<string[]>([])
    const [ tags, setTags ] = useState<string[]>([])
    const [ images, setImages ] = useState<any>([null])
    const [ message, setMessage] = useState("")
    const [ fileCount, setFileCount ] = useState(1)
    const router = useRouter()
    const options = [ "Wi-fi", "TV", "Landry", "Air Conditionar", "Fridge"]
    const checkImages = () => {
        console.log(images)
    }
    return (
       <Layout title="Register accomdations page">
       <Mutation<CreatePostMutation, CreatePostMutationVariables> mutation={createPostMutation}>
       {(mutate: any) => (
        <form onSubmit={async(e) => {
            e.preventDefault()
            const res = await mutate({
                variables: { name, country, city, address,  price, beds, comment, postalcode, amenities, tags, images }
            });
            console.log(res)
            if(res){
              router.push("/user/account")  
            }else {
              setMessage("Something went wrong, please check again")
            }
        }}>
        { page === 0 && (
        <div className="container mx-auto">
         <div className="heading-page relative p-3">
          <div className="flex absolute -bottom-16 right-10 bg-white text-gray-500 rounded-xl w-8/12 shadow-2xl">
             <div className="w-6/12 p-8">
              <h1 className="font-bold text-3xl">Earn 1000$ a month hosting</h1>
              <p className="mt-4">By supporting long stay, earn more than 1000$ a month. From two week to a year, you can get huge revenue by hosting.</p>
             </div>
             <div className="w-6/12 p-8">
                 <h2 className="text-2xl mb-3">Tell us about your place</h2>
                <input type="text" placeholder="country" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" onChange={(e) => setCountry(e.target.value)} value={country} />
                <input type="text" placeholder="city" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2"onChange={(e) => setCity(e.target.value)} value={city} />
                <select className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" onChange={(e) => setBeds(e.target.value)} value={beds} >
                    <option value="2">~2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">5 ~ guests</option>
                </select>
                <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" onClick={(e) => setPage(prev => prev + 1 )}>Proceed to register</button>
             </div>
          </div>
         </div>
         <div className="flex p-3 my-40">
            <div className="w-6/12 p-6">
                <h1 className="font-bold text-3xl">Why host on Invite?</h1>
                <p>
                No matter what kind of home or room you have to share, Airbnb makes it simple and secure to host travelers. You’re in full control of your availability, prices, house rules, and how you interact with guests.
                </p>
            </div>
            <div className="w-6/12 p-6">
                <h1 className="font-bold text-3xl">We have your back</h1>
                <p>
                To keep you, your home, and your belongings safe, we cover every booking with $1M USD in property damage protection and another $1M USD in insurance against accidents.
                </p>
            </div>
         </div>
         <div className="text-center p-16">
             <p className="ml-6">_____________</p>
             <h1 className="font-bold text-3xl">3 Steps to register your accommdation</h1>
             <div className="flex">
                 <div className=""></div>
                 <div className=""></div>
                 <div className=""></div>
             </div>
         </div>
        </div>
        )}
        { page === 1 && (
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
        )}
        { page === 2 && (
            <div className="flex">
                <div className="w-7/12 p-32">
                 <h2>Step 2</h2>
                 <input type="number" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />{"$"}
                 <div className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2">
                 <Typeahead placeholder="Choose several amenities..." multiple selected={amenities} onChange={setAmenities} options={options}  />
                 </div>
                 <textarea className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" onChange={(e) => setComment(e.target.value)} placeholder="other detail" ></textarea>
                 <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" onClick={(e) => setPage(prev => prev + 1 )}>Proceed to next step</button>
                 <button className="w-7/12 mx-auto p-2 bg-gray-500 text-white mt-2" onClick={() => setPage(prev => prev  - 1)}>Back </button>
                </div>
                <div className="w-5/12">
                    <img src="https://images.unsplash.com/photo-1604040427842-0bdb35676f66?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGd1ZXN0JTIwaG91c2V8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="w-full h-auto" />
                </div>
            </div>
        )}
        { page === 3 && (
            <div className="flex">
                <div className="w-5/12">
                    <img src="https://images.unsplash.com/photo-1592628824156-c6f2677d3bd5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGd1ZXN0JTIwaG91c2V8ZW58MHwxfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="w-full h-auto" />
                </div>
                <div className="w-7/12 p-32">
                 <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple  onChange={(e) => setTags([...tags, e.target.value ])} />
                 <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setImages([...images, e.target.files[0].name])
                 }}/>
                 <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
                 { fileCount > 1 && (
                     <>
                       <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setImages([...images, e.target.files[0].name])
                        console.log(images)
                    }}/>
                    <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
                    </>
                 )}
                 { fileCount > 2 && (
                     <>
                      <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setImages([...images, e.target.files[0].name])
                        console.log(images)
                    }}/>
                     <div onClick={(e) => setFileCount(prev => prev + 1)}>Add File</div>
                    </>
                 )}
                 { fileCount > 3 && (
                     <>
                      <input className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" placeholder="Tags" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setImages([...images, e.target.files[0].name])
                        console.log(images)
                    }} />
                     <div onClick={() => checkImages}>Check Images</div>
                    </>
                 )}

                 <button className="w-7/12 mx-auto p-2 bg-blue-500 text-white mt-2" type="submit">Register</button>
                 <button className="w-7/12 mx-auto p-2 bg-gray-500 text-white mt-2" onClick={() => setPage(prev => prev  - 1)}>Back </button>
                 {message && <div>{message}</div>}
                </div>
            </div>
        )}
        </form>
        )}  
        </Mutation>
       </Layout>
    );
}

export default Host