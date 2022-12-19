const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    type: {type: String, default: "type/jpeg"}
});

const ecommerceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Product name is required'],
    },
    imageSrc: {
        type: String,
        require: [true, 'Product image is required'],
    },
    images: [imageSchema],
    price: {
        type: Number,
        require: [true, 'Product price is required'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    stars: {
        type: Number,
        default: 3.5,
    },
    description: {
        type: String,
        default: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    color: {
        type: String,
        require: [true, 'Product color is required'],
    },
    gender: {
        type: String,
        require: [true, 'Product gender required']
    },
    ratings: {
        type: Number,
        default: 10
    }
})

module.exports = mongoose.model("Products", ecommerceSchema)