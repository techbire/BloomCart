const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Sample plant data with realistic names and prices
const samplePlants = [
  {
    name: "Money Plant",
    price: 299,
    categories: ["Indoor", "Air Purifying", "Home Decor"],
    description: "A popular indoor plant known for its heart-shaped leaves and air purifying qualities.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 25,
    image: "https://m.media-amazon.com/images/S/aplus-media/sota/e6183b95-2709-4cd4-ae98-7e5e639cc871.__CR0,0,300,300_PT0_SX300_V1___.jpg"
  },
  {
    name: "Snake Plant",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Low Light"],
    description: "Perfect for beginners, this plant can survive in low light and requires minimal water.",
    care_instructions: "Low light, water sparingly every 2-3 weeks",
    stock_quantity: 15,
    image: "https://images.squarespace-cdn.com/content/v1/5d8a4b31cd3b7e67f9e15748/1571073348910-E26ZFOPA3T4E50RQ9Y6H/C-indoor-plants-2b-225x300.jpg"
  },
  {
    name: "Peace Lily",
    price: 549,
    categories: ["Indoor", "Flowering", "Air Purifying"],
    description: "Elegant flowering plant with white blooms and glossy leaves.",
    care_instructions: "Bright indirect light, keep soil moist",
    stock_quantity: 12,
    image: "https://budsnblush.com/cdn/shop/articles/image1.png?v=1729597596&width=360"
  },
  {
    name: "Rubber Plant",
    price: 699,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "A beautiful large indoor plant with glossy, thick leaves.",
    care_instructions: "Bright indirect light, water when soil surface is dry",
    stock_quantity: 8,
    image: "https://i.etsystatic.com/31301217/r/il/f1f237/5766843654/il_300x300.5766843654_3wnd.jpg"
  },
  {
    name: "Spider Plant",
    price: 199,
    categories: ["Indoor", "Hanging", "Pet Friendly"],
    description: "Easy-care hanging plant perfect for beginners and safe for pets.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 30,
    image: "https://hort.extension.wisc.edu/files/2015/12/chlorophytum-inhouse.jpg"
  },
  {
    name: "Jade Plant",
    price: 349,
    categories: ["Succulent", "Indoor", "Small"],
    description: "Lucky charm succulent with thick, fleshy leaves.",
    care_instructions: "Bright light, water sparingly",
    stock_quantity: 20,
    image: "https://plants.shopsteins.com/Content/Images/Squares/K176-03.jpg"
  },
  {
    name: "Aloe Vera",
    price: 249,
    categories: ["Succulent", "Medicinal", "Indoor"],
    description: "Medicinal plant with healing properties and easy care requirements.",
    care_instructions: "Bright light, minimal water",
    stock_quantity: 18,
    image: "https://static.vecteezy.com/system/resources/thumbnails/065/283/741/small/aloe-vera-plant-in-pot-succulent-green-home-decor-nature-botany-houseplant-indoor-plant-png.png"
  },
  {
    name: "Boston Fern",
    price: 449,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Lush, feathery fern perfect for humid environments.",
    care_instructions: "Indirect light, high humidity, regular misting",
    stock_quantity: 10,
    image: "https://hort.extension.wisc.edu/files/2015/12/BostonFern-foliage.jpg"
  },
  {
    name: "Monstera Deliciosa",
    price: 899,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Trendy plant with unique split leaves, perfect for modern homes.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 6,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Monstera-Deliciosa-300x300.jpg"
  },
  {
    name: "ZZ Plant",
    price: 599,
    categories: ["Indoor", "Low Light", "Air Purifying"],
    description: "Extremely low-maintenance plant that thrives in any condition.",
    care_instructions: "Low to bright light, water monthly",
    stock_quantity: 14,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Zamioculcas_zamiifolia_1.jpg/250px-Zamioculcas_zamiifolia_1.jpg"
  },
  {
    name: "Fiddle Leaf Fig",
    price: 1299,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Statement plant with large, violin-shaped leaves.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 4,
    image: "https://i5.walmartimages.com/asr/de622bfa-2840-4b57-96e0-f0c0f3f7f131.4a9f56dd1dce320f1384fb1a860d62c4.jpeg?odnHeight=264&odnWidth=264&odnBg=FFFFFF"
  },
  {
    name: "Pothos Golden",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Trailing vine with heart-shaped variegated leaves.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 28,
    image: "https://images.squarespace-cdn.com/content/v1/5d8a4b31cd3b7e67f9e15748/1571073348910-E26ZFOPA3T4E50RQ9Y6H/C-indoor-plants-2b-225x300.jpg"
  },
  {
    name: "Areca Palm",
    price: 799,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "Elegant palm that adds tropical vibes to any space.",
    care_instructions: "Bright indirect light, keep soil moist",
    stock_quantity: 7,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Areca-Palm-300x300.jpg"
  },
  {
    name: "English Ivy",
    price: 299,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Classic trailing plant with distinctive lobed leaves.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 22,
    image: "https://cdn.shopify.com/s/files/1/0280/3725/1144/files/300x300-Ivy-in-Diningroom.jpg"
  },
  {
    name: "Dracaena Marginata",
    price: 699,
    categories: ["Indoor", "Air Purifying", "Low Light"],
    description: "Dragon tree with spiky leaves and red edges.",
    care_instructions: "Low to bright light, water when dry",
    stock_quantity: 11,
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d6960244-2dbc-4e77-8fa6-519160afd349.__CR0,0,1500,1500_PT0_SX300_V1___.jpg"
  },
  {
    name: "Philodendron",
    price: 349,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Heart-shaped leaves on trailing vines, very easy to grow.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 19,
    image: "https://m.media-amazon.com/images/I/71I69-ayz9L._UF350,350_QL80_.jpg"
  },
  {
    name: "Cactus Barrel",
    price: 199,
    categories: ["Succulent", "Small", "Indoor"],
    description: "Round barrel cactus perfect for desk decoration.",
    care_instructions: "Bright light, water monthly",
    stock_quantity: 35,
    image: "https://via.placeholder.com/300x300?text=Barrel+Cactus"
  },
  {
    name: "Bamboo Palm",
    price: 649,
    categories: ["Indoor", "Air Purifying", "Pet Friendly"],
    description: "Graceful palm safe for pets with excellent air purifying qualities.",
    care_instructions: "Bright indirect light, keep soil moist",
    stock_quantity: 9,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/bamboo-palm-300x300.jpg"
  },
  {
    name: "Lavender",
    price: 399,
    categories: ["Outdoor", "Flowering", "Medicinal"],
    description: "Fragrant herb with purple flowers, perfect for gardens.",
    care_instructions: "Full sun, well-draining soil, moderate water",
    stock_quantity: 16,
    image: "https://herbsathome.co/images/kentish-lavender-in-vase-320.jpeg"
  },
  {
    name: "Rosemary",
    price: 299,
    categories: ["Outdoor", "Medicinal", "Small"],
    description: "Aromatic herb perfect for cooking and natural pest control.",
    care_instructions: "Full sun, well-draining soil, minimal water",
    stock_quantity: 24,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Growing-Rosemary-indoors-300x300.jpg"
  },
  {
    name: "Marigold",
    price: 149,
    categories: ["Outdoor", "Flowering", "Small"],
    description: "Bright orange and yellow flowers, great for garden borders.",
    care_instructions: "Full sun, regular watering, deadhead spent flowers",
    stock_quantity: 40,
    image: "https://i.pinimg.com/236x/e7/47/cd/e747cd0cfef60fae6537bcd753daf842.jpg"
  },
  {
    name: "Tulsi Plant",
    price: 179,
    categories: ["Outdoor", "Medicinal", "Small"],
    description: "Holy basil with spiritual and medicinal significance.",
    care_instructions: "Full sun to partial shade, regular watering",
    stock_quantity: 32,
    image: "https://via.placeholder.com/300x300?text=Tulsi"
  },
  {
    name: "Bougainvillea",
    price: 549,
    categories: ["Outdoor", "Flowering", "Large"],
    description: "Vibrant climbing plant with colorful bracts.",
    care_instructions: "Full sun, moderate water, prune regularly",
    stock_quantity: 8,
    image: "https://target.scene7.com/is/image/Target/GUEST_eb4d852d-f5f6-4c30-8a40-9664e4d13802?wid=300&hei=300&fmt=pjpeg"
  },
  {
    name: "Croton",
    price: 449,
    categories: ["Indoor", "Home Decor", "Outdoor"],
    description: "Colorful foliage plant with variegated leaves.",
    care_instructions: "Bright light, regular watering, high humidity",
    stock_quantity: 13,
    image: "https://www.britishflowersdirect.com/cdn/shop/files/IMG_7856_300x300.jpg?v=1744369419"
  },
  {
    name: "Hibiscus",
    price: 399,
    categories: ["Outdoor", "Flowering", "Large"],
    description: "Large tropical flowers in various colors.",
    care_instructions: "Full sun, regular watering, fertile soil",
    stock_quantity: 12,
    image: "https://hiddenvalleynaturearts.com/wp-content/uploads/2023/10/houseplantformula-300x300.jpg"
  },
  {
    name: "Mint Plant",
    price: 149,
    categories: ["Outdoor", "Medicinal", "Small"],
    description: "Aromatic herb perfect for teas and cooking.",
    care_instructions: "Partial shade, moist soil, regular harvesting",
    stock_quantity: 45,
    image: "https://via.placeholder.com/300x300?text=Mint"
  },
  {
    name: "Ficus Bonsai",
    price: 1199,
    categories: ["Indoor", "Small", "Home Decor"],
    description: "Miniature tree perfect for meditation spaces.",
    care_instructions: "Bright indirect light, careful watering, regular pruning",
    stock_quantity: 5,
    image: "https://via.placeholder.com/300x300?text=Bonsai"
  },
  {
    name: "Christmas Cactus",
    price: 349,
    categories: ["Succulent", "Indoor", "Flowering"],
    description: "Holiday bloomer with segmented leaves and bright flowers.",
    care_instructions: "Bright indirect light, moderate water, cool nights for blooming",
    stock_quantity: 17,
    image: "https://i.etsystatic.com/24205493/r/il/042e30/6500213144/il_300x300.6500213144_njw9.jpg"
  },
  {
    name: "Bird of Paradise",
    price: 1599,
    categories: ["Indoor", "Large", "Flowering"],
    description: "Exotic plant with large paddle-shaped leaves and orange bird-like flowers.",
    care_instructions: "Bright light, regular water, high humidity",
    stock_quantity: 3,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Bird-of-Paradise-300x300.jpg"
  },
  {
    name: "Calathea",
    price: 649,
    categories: ["Indoor", "Home Decor", "Air Purifying"],
    description: "Prayer plant with beautiful patterned leaves.",
    care_instructions: "Bright indirect light, high humidity, distilled water",
    stock_quantity: 8,
    image: "https://m.media-amazon.com/images/S/aplus-media/sota/27041c72-a962-4614-95ee-3908b1871936.__CR0,0,300,300_PT0_SX300_V1___.jpg"
  },
  {
    name: "Agave Plant",
    price: 799,
    categories: ["Succulent", "Outdoor", "Large"],
    description: "Architectural succulent with thick, pointed leaves.",
    care_instructions: "Full sun, minimal water, well-draining soil",
    stock_quantity: 6,
    image: "https://via.placeholder.com/300x300?text=Agave"
  },
  {
    name: "Geranium",
    price: 249,
    categories: ["Outdoor", "Flowering", "Small"],
    description: "Cheerful flowering plant perfect for containers.",
    care_instructions: "Full sun to partial shade, regular watering",
    stock_quantity: 26,
    image: "https://s23775.pcdn.co/wp-content/uploads/sites/44/2019/03/Geranium-Cuttings-e1552594878212-300x300.jpg.optimal.jpg"
  },
  {
    name: "Begonia",
    price: 299,
    categories: ["Outdoor", "Flowering", "Small"],
    description: "Colorful flowers with attractive foliage.",
    care_instructions: "Partial shade, moist soil, regular feeding",
    stock_quantity: 21,
    image: "https://static.vecteezy.com/system/resources/thumbnails/007/771/912/small/green-round-leaf-texture-on-dark-background-close-up-detail-of-begonia-leaves-house-plant-indoor-plants-begonia-leaf-for-home-decoration-wallpaper-for-spa-or-mental-health-and-mind-therapy-photo.jpg"
  },
  {
    name: "Yucca Plant",
    price: 899,
    categories: ["Indoor", "Outdoor", "Large"],
    description: "Architectural plant with sword-like leaves.",
    care_instructions: "Bright light, minimal water, well-draining soil",
    stock_quantity: 7,
    image: "https://via.placeholder.com/300x300?text=Yucca"
  },
  {
    name: "String of Hearts",
    price: 449,
    categories: ["Succulent", "Hanging", "Indoor"],
    description: "Trailing succulent with heart-shaped variegated leaves.",
    care_instructions: "Bright indirect light, water when soil is dry",
    stock_quantity: 12,
    image: "https://i.etsystatic.com/17296139/r/il/24139f/4202304050/il_300x300.4202304050_579w.jpg"
  },
  {
    name: "Norfolk Pine",
    price: 1099,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Living Christmas tree that grows indoors year-round.",
    care_instructions: "Bright indirect light, regular watering, high humidity",
    stock_quantity: 4,
    image: "https://planttalk.colostate.edu/images/1321f1.jpg"
  },
  {
    name: "Ponytail Palm",
    price: 749,
    categories: ["Indoor", "Succulent", "Home Decor"],
    description: "Unique plant with swollen trunk and long, thin leaves.",
    care_instructions: "Bright light, minimal water, well-draining soil",
    stock_quantity: 9,
    image: "https://hort.extension.wisc.edu/files/2015/12/Beaucarnia-houseplant.jpg"
  },
  {
    name: "Air Plant",
    price: 199,
    categories: ["Indoor", "Small", "Air Purifying"],
    description: "Soilless plants that absorb nutrients from the air.",
    care_instructions: "Bright indirect light, mist 2-3 times weekly",
    stock_quantity: 38,
    image: "https://www.gardenhealth.com/wp-content/uploads/2018/11/Peace_Lily-Indoor-plants-270x270.webp"
  },
  {
    name: "Echeveria",
    price: 179,
    categories: ["Succulent", "Small", "Indoor"],
    description: "Rose-shaped succulent with thick, fleshy leaves.",
    care_instructions: "Bright light, minimal water, good drainage",
    stock_quantity: 42,
    image: "https://i.etsystatic.com/23972964/r/il/27de1c/6301759042/il_300x300.6301759042_ojmz.jpg"
  },
  {
    name: "Chinese Evergreen",
    price: 549,
    categories: ["Indoor", "Low Light", "Air Purifying"],
    description: "Colorful foliage plant that tolerates low light.",
    care_instructions: "Low to bright indirect light, moderate water",
    stock_quantity: 11,
    image: "https://images-eu.ssl-images-amazon.com/images/I/7186xnGIi7L._AC_UL210_SR210,210_.jpg"
  },
  {
    name: "Anthurium",
    price: 699,
    categories: ["Indoor", "Flowering", "Air Purifying"],
    description: "Glossy heart-shaped flowers in bright colors.",
    care_instructions: "Bright indirect light, high humidity, regular watering",
    stock_quantity: 8,
    image: "https://static.vecteezy.com/system/resources/thumbnails/054/331/268/small/vibrant-pink-anthurium-plant-lush-green-foliage-houseplant-indoor-flower-photo.jpg"
  },
  {
    name: "Peperomia",
    price: 299,
    categories: ["Indoor", "Small", "Pet Friendly"],
    description: "Compact plant with thick, waxy leaves in various patterns.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 25,
    image: "https://i.etsystatic.com/22361832/c/1921/1921/0/1/il/7f15b5/2398668884/il_300x300.2398668884_itfp.jpg"
  },
  {
    name: "Schefflera",
    price: 599,
    categories: ["Indoor", "Air Purifying", "Large"],
    description: "Umbrella plant with glossy, palmate leaves.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 10,
    image: "https://images.thdstatic.com/productImages/7fa88296-c486-4b87-ba43-7d912ab1f05d/svn/house-plants-samate10dg-64_300.jpg"
  },
  {
    name: "Haworthia",
    price: 229,
    categories: ["Succulent", "Small", "Indoor"],
    description: "Small succulent with distinctive white markings.",
    care_instructions: "Bright indirect light, minimal water",
    stock_quantity: 33,
    image: "https://i.etsystatic.com/23972964/c/1201/1201/0/0/il/14aa7a/3690377899/il_300x300.3690377899_p9am.jpg"
  },
  {
    name: "Dieffenbachia",
    price: 449,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "Dumbcane with large, variegated leaves.",
    care_instructions: "Bright indirect light, moderate water",
    stock_quantity: 12,
    image: "https://images.thdstatic.com/productImages/4ebd4d45-f296-4fee-9f74-a07271c2b4b4/svn/costa-farms-house-plants-co-df06-3-cyl-64_300.jpg"
  },
  {
    name: "Maranta",
    price: 399,
    categories: ["Indoor", "Home Decor", "Pet Friendly"],
    description: "Prayer plant with beautiful patterned leaves that fold at night.",
    care_instructions: "Bright indirect light, high humidity, regular watering",
    stock_quantity: 15,
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Prayer-Plant-300x300.jpg"
  },
  {
    name: "Parlor Palm",
    price: 449,
    categories: ["Indoor", "Air Purifying", "Pet Friendly"],
    description: "Elegant small palm perfect for indoor spaces.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 14,
    image: "https://i.etsystatic.com/12475128/r/il/4e4f07/6811382985/il_300x300.6811382985_3l05.jpg"
  },
  {
    name: "Bromeliad",
    price: 549,
    categories: ["Indoor", "Flowering", "Home Decor"],
    description: "Tropical plant with colorful bracts and unique flower structure.",
    care_instructions: "Bright indirect light, water in central cup",
    stock_quantity: 9,
    image: "https://i.etsystatic.com/16092507/c/604/604/84/184/il/72defa/2067159859/il_300x300.2067159859_gel1.jpg"
  },
  {
    name: "Clivia",
    price: 799,
    categories: ["Indoor", "Flowering", "Low Light"],
    description: "Elegant flowering plant with orange trumpet-shaped blooms.",
    care_instructions: "Bright indirect light, water moderately",
    stock_quantity: 6,
    image: "https://i.pinimg.com/236x/e8/16/3f/e8163f1b149d0693e6f0acaaaddbcc7e.jpg"
  },
  {
    name: "Nerve Plant",
    price: 199,
    categories: ["Indoor", "Small", "Home Decor"],
    description: "Delicate plant with intricate white or pink veining on leaves.",
    care_instructions: "Bright indirect light, high humidity, consistent moisture",
    stock_quantity: 29,
    image: "https://m.media-amazon.com/images/I/31gZomjLdVL.jpg"
  },
  {
    name: "Hoya",
    price: 649,
    categories: ["Indoor", "Hanging", "Flowering"],
    description: "Wax plant with thick, waxy leaves and fragrant star-shaped flowers.",
    care_instructions: "Bright indirect light, water when dry",
    stock_quantity: 8,
    image: "https://www.hoyaplanter.com/wp-content/uploads/2022/09/90115-Hoya-Imperialis-Palawan-2-247x296.jpg"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plantstore');
    console.log('Connected to MongoDB');

    // Clear existing plants
    await Plant.deleteMany({});
    console.log('Cleared existing plants');

    // Insert sample data
    await Plant.insertMany(samplePlants);
    console.log(`Successfully seeded ${samplePlants.length} plants`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
