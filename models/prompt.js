import  {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    title:{
        type:String,
        required:[true, "Título requerido"]
    },
    prompt:{
        type:String,
        required:[true, "Prompt é requerido"]
    },
    tag:{
        type:String,
        required:[true, "A Tag é requerida"]
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt