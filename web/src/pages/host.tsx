import React, { useState } from 'react' 
import { Layout } from 'src/components/layout';

interface hostProps {

}

const Host: React.FC<hostProps> = ({}) =>{
    const [ page, setPage ] = useState(0);
    return (
       <Layout title="Register accomdations page">
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
                <input type="text" placeholder="country" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" />
                <input type="text" placeholder="city" className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2" />
                <select className="w-10/12 mx-auto border border-gray-200 box-shadow p-2 my-2">
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
                <div className="w-1/2"></div>
                <div className="w-1/2"></div>
            </div>
        )}
        { page === 2 && (
            <div className="flex">
                <div className="w-1/2"></div>
                <div className="w-1/2"></div>
            </div>
        )}
        { page === 3 && (
            <div className="flex">
                <div className="w-1/2"></div>
                <div className="w-1/2"></div>
            </div>
        )}
       </Layout>
    );
}

export default Host