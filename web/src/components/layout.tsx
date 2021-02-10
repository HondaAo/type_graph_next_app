import * as React from 'react' 
import Head from "next/head";
import Link from "next/link";
import { FaUser } from 'react-icons/fa'
// import { MdMessage } from 'react-icons/md'
// import { FiSearch } from 'react-icons/fi'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { MeQuery } from 'src/schemaTypes';
interface layoutProps {
    title: string,
    children: React.ReactNode
}

const meQuery = gql`
 query MeQuery {
     me {
         id
         email
     }
 }
`;

export const Layout: React.FC<layoutProps> = ({title, children}) =>{
        return (
            <>
             <Head>
              <title>{title}</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
             </Head>
             <div className="relative text-gray-500">
              <Header />
              <div >
              {children}
              </div>
              <Footer />
             </div>
            </>
        );
}

const IsAuth = () => {
    return (
        <Query<MeQuery> query={meQuery}>
         {({data, loading}) => {
            if(loading){
              return <div>Loading...</div>;
            } 
            if(!data){
                return (
                    <div className="flex">
                        <Link href="/user/login"><a>Login</a></Link>
                    </div>
                )
            }
            return (
                <div className="flex mr-12" style={{ color: '#465280'}}>
                  <Link href="/host"><a className="mr-8">Become a host</a></Link>
                  <Link href="/user/account" ><a className="mr-8"><FaUser className="text-2xl" /></a></Link>
                </div>   
            )
          }}
        </Query>
    );
}

const Header = () => {
    return (
        <div className="flex items-center justify-between p-6 text-gray-500 border border border-gray-200 top-0 w-full z-50">
         <div className="pl-24 mr-6">
             <Link href="/" ><a className="font-extrabold">INVITE</a></Link>
         </div>
         <IsAuth />
        </div>
    )
}

const Footer = () => {
    return (
        <div className="flex p-6 border border-gray-300 justify-between bg-gray-200">
            <div className="pl-24 font-extrabold">INVITE</div>
            <div className="flex pr-24">
                <Link href="/"><a className="mr-12">Privacy</a></Link>
                <Link href="/"><a>SiteMap</a></Link>
            </div>
        </div>
    )
}