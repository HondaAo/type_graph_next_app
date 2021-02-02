import * as React from 'react'
import { Layout } from 'src/components/layout'
import { Search } from 'src/components/Search'
export default function Home() {
  return (
    <Layout title="Home page">
     <div className="top-image bg-cover h-96">
       <h1 className="text-white p-16 font-extrabold text-6xl text-right">Remote Work From Here</h1>
     </div>
     <div className="container mx-auto w-11/12 mt-16">
       <h1 className="text-4xl font-bold">Work from your favorite place</h1>
       <div className="flex">
         <div className="image-width mr-6 mt-6">
           <img src="https://images.unsplash.com/photo-1558411005-ea29ca4bba28?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYWNofGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="rounded-xl mb-6" />
           <h3 className="text-xl font-semibold">Nearby Beaches</h3>
         </div>
         <div className="image-width mr-6 mt-6">
           <img src="https://images.unsplash.com/photo-1564047046531-fe7ceae81291?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGJhbGl8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="rounded-xl mb-6" />
           <h3 className="text-xl font-semibold">Sourrounded By Nature</h3>
         </div>
         <div className="image-width mr-6 mt-6">
           <img src="https://images.unsplash.com/photo-1567201084856-b53427a34c94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8dW5pcXVlJTIwaG91c2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="rounded-xl mb-6" />
           <h3 className="text-xl font-semibold">Unique Accomdation</h3>
         </div>
         <div className="image-width mr-6 mt-6">
           <img src="https://images.unsplash.com/photo-1603076534270-364861eac82d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" className="rounded-xl mb-6" />
           <h3 className="text-xl font-semibold">Long stay</h3>
         </div>
       </div>
       <div className="text-center my-48">
        <h1 className="text-3xl">Lets search your favorite place.</h1>
        <Search />
        <h1>Suggested: Sourtheast Asia, Beach, Free-WiFi</h1>
       </div>
     </div>
    </Layout>
  )
}
