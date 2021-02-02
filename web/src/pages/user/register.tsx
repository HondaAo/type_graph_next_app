import React, { useEffect, useState } from 'react' 
import { Layout } from 'src/components/layout'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import {useRouter} from 'next/router'
import { RegisterMutation, RegisterMutationVariables } from 'src/schemaTypes';
import Link from 'next/link';

interface registerProps {

}

const registerMutation = gql`
 mutation RegisterMutation($name: String!, $email: String!, $password: String!, $type: String!) {
    register(name: $name, email: $email, password: $password, type: $type)
 }
`

const register: React.FC<registerProps> = ({}) =>{
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ type, setType ] = useState("");
    const [ message, setMessage ] = useState("")
    const router = useRouter();
    useEffect(() => {

    },[])
    return(
        <Layout title="register page">
        <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
        {(mutate: any) => (
          <div className="w-3/6 mx-auto my-20 p-12 border border-gray-200 box-shadow text-center">
           <form onSubmit={async(e) => {
              e.preventDefault()
              const res = await mutate({
                  variables: { name, email, password, type }
              });
              console.log(res)
              if(res){
                router.push("/user/login")  
              }else {
                setMessage("Something went wrong, please check again")
              }
            }}>
            <h1>Register with Email</h1>
            {message && <p>{message}</p> }
            <input type="text" placeholder="username" value={name} required onChange={(e) => setName(e.target.value)}  className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3"/> 
            <input type="email" placeholder="email" value={email} required onChange={(e) => setEmail(e.target.value)}  className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3"/>
            <input type="password" placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3" />
            <select onChange={(e) => setType(e.target.value)} value={type} className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3" >
                <option value="host">Host</option>
                <option value="guest">Guest</option>
            </select>
            <button  className="w-3/12 mx-auto p-2 bg-blue-500 text-white" >Register</button>
            <p className="my-6">Already having an account? <Link href="/user/login"><a className="text-blue-300">Login page</a></Link></p>
           </form>
          </div>      
          )}        
        </Mutation>
        </Layout>
    )
}

export default register