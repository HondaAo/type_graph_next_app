import React, { useEffect, useState } from 'react' 
import { Layout } from 'src/components/layout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import {useRouter} from 'next/router'
import { LoginMutation, LoginMutationVariables } from '../../schemaTypes';
import Link from 'next/link';

interface loginProps {

}

const loginMutation = gql`
 mutation LoginMutation($email: String!, $password: String!) {
         login(email: $email, password: $password){
             id
             email
         }
 }
`

const Login: React.FC<loginProps> = ({}) =>{
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState("")
    const router = useRouter();
    console.log(document.cookie)
    useEffect(() => {
      
    },[])
    return (
        <Layout title="Login Page">
          <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
          {(mutate) => (
          <div className="w-3/6 mx-auto my-20 p-12 border border-gray-200 box-shadow text-center">
           <form onSubmit={async(e) => {
                    e.preventDefault();
                    const res = await mutate({
                        variables: { email, password }
                    });
                    if(res){
                        router.push("/user/login")  
                    }else {
                        setMessage("Something went wrong, please check again")
                    }
            }}>
            <h1>Login with Email</h1>
            {message && <p>{message}</p>}
            <input type="text" placeholder="email" value={email} required onChange={(e) => setEmail(e.target.value)}  className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3" />
            <input type="password" placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)} className="w-10/12 mx-auto border border-gray-200 box-shadow p-3 my-3" />
            <input type="submit" value="login" className="w-3/12 mx-auto p-2 bg-blue-500 text-white" />
            <p className="my-6">Not having an account? <Link href="/user/register"><a className="text-blue-300">Register page</a></Link></p>
           </form>
          </div>      
          )}        
          </Mutation>
        </Layout>
    );
}
export default Login