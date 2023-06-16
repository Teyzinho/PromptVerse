import { connectToDB } from "@utils/database" 
import Prompt from "@models/prompt"; 

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator'); // Busca o prompt pelo ID fornecido em params.id e popula a propriedade 'creator' com os dados do criador
        if (!prompt) return new Response("Prompt not found", { status: 404 }) 

        return new Response(JSON.stringify(prompt), { status: 200 }) 
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 }) 
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json(); // Extrai os valores de 'prompt' e 'tag' do corpo da requisição

    try {
        await connectToDB(); 

        const existingPrompt = await Prompt.findById(params.id); // Encontra o prompt existente pelo ID fornecido em params.id
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 }) 

        existingPrompt.prompt = prompt; // Atualiza a propriedade 'prompt' do prompt existente com o novo valor
        existingPrompt.tag = tag; // Atualiza a propriedade 'tap' do prompt existente com o novo valor

        await existingPrompt.save(); // Salva as alterações no prompt existente

        return new Response(JSON.stringify(existingPrompt), { status: 200 }) 
    } catch (error) {
        return new Response("Failed to update", { status: 500 }) 
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB(); 

        await Prompt.findByIdAndRemove(params.id); // Remove o prompt com base no ID fornecido em params.id

        return new Response("Prompt deletado com sucesso", { status: 200 }) 
    } catch (error) {
        return new Response("falha ao deletar Prompt", { status: 500 }) 
    }
}
