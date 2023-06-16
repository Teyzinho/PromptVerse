import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // Função chamada ao criar ou atualizar uma sessão do usuário
        async session({ session }) {
            // Buscando o usuário no banco de dados com base no email da sessão
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            // Definindo o ID do usuário na sessão
            session.user.id = sessionUser._id.toString();

            return session;
        },
        // Função chamada ao efetuar o login do usuário
        async signIn({ profile }) {
            try {
                await connectToDB();// Conectando ao banco de dados
                //checar se o usuário existe
                const userExists = await User.findOne({
                    email: profile.email
                })

                //se não existir, cria um novo usuário
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }

                return true;
            } catch (error) {
                console.log("error signIn profile", error);
                return false;
            }
        }
    },

})

// Exportando o handler para ser usado nas rotas GET e POST
export { handler as GET, handler as POST };