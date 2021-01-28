import * as React from 'react' 
import Head from "next/head";
import Link from "next/link";
import { FaUser } from 'react-icons/fa'
import { MdMessage } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { MeQuery } from 'src/schemaTypes';
import { GrLogin } from 'react-icons/gr'
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
             <Header />
             {children}
             <Footer />
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
                        <GrLogin className="mr-6" />Login
                    </div>
                )
            }

            if(!data.me){
                return (
                    <div className="flex">
                        <Link href="/user/login"><a>Login</a></Link>
                    </div>
                )
            }

            return (
                <div className="flex">
                  <div className="mr-6">Profile</div>
                  <div>Message</div>
                </div>   
            )
          }}
        </Query>
    );
}

const Header = () => {
    return (
        <div className="flex items-center justify-between p-6 text-gray-500">
         <div className="ml-6 mr-6">
             <Link href="/" ><a className="font-extrabold">INVITE</a></Link>
         </div>
         <IsAuth />
        </div>
    )
}

const Footer = () => {
    return (
        <div className="">

        </div>
    )
}