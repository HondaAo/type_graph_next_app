import React, { useState } from 'react' 
import { Layout } from 'src/components/layout'
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import {useRouter} from 'next/router'
import { RegisterMutation, RegisterMutationVariables } from 'src/schemaTypes';

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
    const router = useRouter();
    return(
        <Layout title="register page">
        <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
        {(mutate: any) => (
          <div>
           <form>
            <input type="text" placeholder="username" value={name} required onChange={(e) => setName(e.target.value)} /> 
            <input type="email" placeholder="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setType(e.target.value)} value={type}>
                <option value="traveler">Traveler</option>
                <option value="host">Host</option>
            </select>
            <button onClick={async() => {
                    const res = await mutate({
                        variables: { name, email, password }
                    });
                    if(res){
                      router.push("/login")  
                    }
            }}>Register</button>
           </form>
          </div>      
          )}        
        </Mutation>
        </Layout>
    )
}

export default register