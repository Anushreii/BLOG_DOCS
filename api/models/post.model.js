import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId :{
        type: String,
        required : true,
       
    },

    content:{
        type: String,
        required: true,
       
    },

    title:{
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3_eYYfBz7fiY-wD5n0o83Tq43AA44BR_SryIX784ZaG7OTyXoZggLh11hyQ2oeFO-mI&usqp=CAU'
    },

    category:{
        type: String,
        default: 'uncategorized'
    },

    slug:{
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;