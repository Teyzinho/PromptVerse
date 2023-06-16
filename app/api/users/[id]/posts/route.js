import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator'); // Busca todos os prompts no banco de dados e popula a propriedade 'creator' com os dados do criador

        return new Response(JSON.stringify(prompts),{
            status:200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts",{
            status:500
        })
    }
}

