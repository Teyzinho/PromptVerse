import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        unique: [true, 'Email ja existe!'],
        require: [true, 'Email requerido!'],
    },
    username:{
        type:String,
        require: [true, 'Email requerido!'],
        match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalido, deve ter 3-20 letras e ser unico!"]
    },
    Image:{
        type: String
    }
});

// Verificando se já existe um modelo User, caso contrário, cria um novo modelo
const User = models.User || model("User", UserSchema);

export default User;