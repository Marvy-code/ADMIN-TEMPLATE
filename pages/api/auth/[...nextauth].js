import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import https from 'https';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Votre nom d'utilisateur" },
                password: { label: "Password", type: "password", placeholder: "Votre mot de passe" },
                code_appli: { label: "code appli", type: "text", value: "EVENTMANAGER" }
            },
            authorize: async(credentials)=>{
                try{
                    const agent = new https.Agent({
                        rejectUnauthorized: false, // Désactiver SSL en dev
                      });
                    const res = await fetch('https://bzv-test-appli:8000/api/home/signin', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            Username: credentials.username,
                            Password: credentials.password,
                            Code_appli: "EVENTMANAGER"
                        }),
                        agent
                    });

                    const data = await res.json();

                    if(res.ok && data.token){
                        return { data }
                    }
                    else{
                        return null
                    }

                }catch(error){
                    console.error("Erreur", error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }){
            if(user){
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }){
            session.accessToken = token.accessToken;
            return session
        }
    },
    pages: {
        signIn: "/",
        error: "/"
    },
    secret: process.env.NEXTAUTH_SECRET
})