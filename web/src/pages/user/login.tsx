import React, { useState } from 'react' 
import { Layout } from 'src/components/layout';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import {useRouter} from 'next/router'
import { LoginMutation, LoginMutationVariables } from '../../schemaTypes';

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
    const router = useRouter();
    return (
        <Layout title="login page">
          <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
          {(mutate) => (
          <div>
           <form onSubmit={async(e) => {
                    e.preventDefault();
                    const res = await mutate({
                        variables: { email, password }
                    });
                    console.log(res)
                    router.push("/")
            }}>
            <input type="text" placeholder="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="login" className="" />
           </form>
          </div>      
          )}        
          </Mutation>
        </Layout>
    );
}
export default Login