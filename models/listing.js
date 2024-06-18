const mongoose = require("mongoose");
const Review = require("./review");
const {Schema} = mongoose; 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://www.istockphoto.com/photo/potil-island-indonesia-gm481242721-36752164?utm_campaign=adp_photos_sponsored&utm_content=https%3A%2F%2Funsplash.com%2Fphotos%2Fpalm-tree-near-seashore-Siuwr3uCir0&utm_medium=affiliate&utm_source=unsplash&utm_term=panama%3A%3A%3A",
        set: (v) => v==="" ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v, 
    },
    price: Number,
    location: String,
    country: String,
    reviews: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            }
        ]
});

listingSchema.post("findOneAndDelete", async(list) => {
    if(list) {
        await Review.deleteMany({_id: {$in: list.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
