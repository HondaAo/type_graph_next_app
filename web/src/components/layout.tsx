import * as React from 'react' 
import Head from "next/head";
import Link from "next/link";

interface layoutProps {
    title: string,
    children: React.ReactNode
}

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

const Header = () => {
    return (
        <div className="">
        </div>
    )
}

const Footer = () => {
    return (
        <div className="">

        </div>
    )
}