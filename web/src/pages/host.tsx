import React, { useState } from 'react' 
import { Layout } from 'src/components/layout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { CreatePostMutation, CreatePostMutationVariables } from 'src/schemaTypes';
import {useRouter} from 'next/router'
import axios from 'axios'
import { Page2 } from 'src/components/Page2';
import { Page3 } from 'src/components/Page3';
import { Page1 } from 'src/components/Page1';
interface HostTypes {
    hashTags: {
        customOption: boolean, 
        label: string, 
        id: string
    }
}

const createPostMutation = gql`
 mutation CreatePostMutation($name: String!, $country: String!, $city: String!, $address: String!, $price: Int!, $beds: String!,$comment: String!, $postalcode: String!, $amenities: [String!]!, $tags: [String!]!, $files: [String!]!) {
    createPost(input: {name: $name, country: $country, city: $city, address: $address, comment: $comment,  price: $price, beds: $beds, postalcode: $postalcode, amenities: $amenities, tags: $tags, files: $files})
 }
`

 

const Host: React.FC<HostTypes> = ({}) =>{
    const [ page, setPage ] = useState(0);
    const [ name, setName ] = useState("");
    const [ country, setCountry ] = useState("")
    const [ city, setCity ] = useState("")
    const [ address, setAdress ] = useState("")
    const [ price, setPrice ] = useState(30)
    const [ beds, setBeds ] = useState("2") 
    const [ postalcode, setPostalcode ] = useState("")
    const [ amenities, setAmenities ] = useState<string[]>([])
    const [ comment, setComment ] = useState("");
    const [ tags, setTags ] = useState<any>()
    const [ images, setImages ] = useState<any>([])
    const [ message, setMessage] = useState("")
    const [ fileCount, setFileCount ] = useState(1)
    const router = useRouter()
    return (
       <Layout title="Register accomdations page">
       <Mutation<CreatePostMutation, CreatePostMutationVariables> mutation={createPostMutation}>
       {(mutate: any) => (
        <form onSubmit={async(e) => {
            e.preventDefault()
            const formData = new FormData();
            let files = [];
            let hashTags = [];
            for(let i=0; i < images.length; i++){
                formData.append("file", images[i])
                formData.append('upload_preset', 'g3hhlpdw');
                console.log(formData)
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/yokohama-shi/image/upload`,
                    formData,
                );
                files.push(response.data.url)
            }
            console.log( { name, country, city, address,  price, beds, comment, postalcode, amenities, tags, files })
            for(let i=0; i < tags.length; i++){
                hashTags.push(tags[i].label)
            }
            const res = await mutate({
                variables: { name, country, city, address,  price, beds, comment, postalcode, amenities, tags: hashTags, files }
            });
            setMessage("Loading....")
            if(res){
              setMessage("")
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
         <div className="p-16">
             <div className="text-center mb-8">
             <p className="ml-6">_____________</p>
             <h1 className="font-bold text-4xl">3 Steps to register your accommdation</h1>
             </div>
             <div className="flex">
                 <div className="w-1/3 p-6">
                     <h1 className="font-bold text-2xl">List your space for free</h1>
                     <p>Share any space without sign-up charges, from a shared living room to a second home and everything in-between.</p>
                 </div>
                 <div className="w-1/3 p-6">
                     <h1 className="font-bold text-2xl">Decide how you want to host</h1>
                     <p>Choose your own schedule, prices, and requirements for guests. We’re there to help along the way.</p>
                 </div>
                 <div className="w-1/3 p-6">
                      <h1 className="font-bold text-2xl">Welcome your first guest</h1>
                     <p>Once your listing is live, qualified guests can reach out. You can message them with any questions before their stay.</p>
                 </div>
             </div>
         </div>
        </div>
        )}
        { page === 1 && (
            <Page1 setPage={setPage} setName={setName} setAdress={setAdress} setPostalcode={setPostalcode} address={address} name={name} postalcode={postalcode} />
        )}
        { page === 2 && (
           <Page2 setPage={setPage} setPrice={setPrice} setAmenities={setAmenities} setComment={setComment} />
        )}
        { page === 3 && (

           <Page3 setPage={setPage} setImages={setImages} setFileCount={setFileCount} fileCount={fileCount} images={images} setTags={setTags} tags={tags} />
        )}
        {message && <p>{message}</p>}
        </form>
        )}  
        </Mutation>
       </Layout>
    );
}

export default Host