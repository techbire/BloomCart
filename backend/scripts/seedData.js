const mongoose = require('mongoose');
const Plant = require('../models/Plant');
require('dotenv').config();

// Sample plant data with realistic names and prices
const samplePlants = [
  {
    name: "Money Plant",
    price: 299,
    categories: ["Indoor", "Air Purifying", "Home Decor"],
    description: "A popular indoor plant known for its heart-shaped leaves and air purifying qualities.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 25,
    image: "https://via.placeholder.com/300x300?text=Money+Plant"
  },
  {
    name: "Snake Plant",
    price: 399,
    categories: ["Indoor", "Air Purifying", "Low Light"],
    description: "Perfect for beginners, this plant can survive in low light and requires minimal water.",
    care_instructions: "Low light, water sparingly every 2-3 weeks",
    stock_quantity: 15,
    image: "https://via.placeholder.com/300x300?text=Snake+Plant"
  },
  {
    name: "Peace Lily",
    price: 549,
    categories: ["Indoor", "Flowering", "Air Purifying"],
    description: "Elegant flowering plant with white blooms and glossy leaves.",
    care_instructions: "Bright indirect light, keep soil moist",
    stock_quantity: 12,
    image: "https://via.placeholder.com/300x300?text=Peace+Lily"
  },
  {
    name: "Rubber Plant",
    price: 699,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "A beautiful large indoor plant with glossy, thick leaves.",
    care_instructions: "Bright indirect light, water when soil surface is dry",
    stock_quantity: 8,
    image: "https://via.placeholder.com/300x300?text=Rubber+Plant"
  },
  {
    name: "Spider Plant",
    price: 199,
    categories: ["Indoor", "Hanging", "Pet Friendly"],
    description: "Easy-care hanging plant perfect for beginners and safe for pets.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 30,
    image: "https://via.placeholder.com/300x300?text=Spider+Plant"
  },
  {
    name: "Jade Plant",
    price: 349,
    categories: ["Succulent", "Indoor", "Small"],
    description: "Lucky charm succulent with thick, fleshy leaves.",
    care_instructions: "Bright light, water sparingly",
    stock_quantity: 20,
    image: "https://via.placeholder.com/300x300?text=Jade+Plant"
  },
  {
    name: "Aloe Vera",
    price: 249,
    categories: ["Succulent", "Medicinal", "Indoor"],
    description: "Medicinal plant with healing properties and easy care requirements.",
    care_instructions: "Bright light, minimal water",
    stock_quantity: 18,
    image: "https://via.placeholder.com/300x300?text=Aloe+Vera"
  },
  {
    name: "Boston Fern",
    price: 449,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Lush, feathery fern perfect for humid environments.",
    care_instructions: "Indirect light, high humidity, regular misting",
    stock_quantity: 10,
    image: "https://via.placeholder.com/300x300?text=Boston+Fern"
  },
  {
    name: "Monstera Deliciosa",
    price: 899,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Trendy plant with unique split leaves, perfect for modern homes.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 6,
    image: "https://via.placeholder.com/300x300?text=Monstera"
  },
  {
    name: "ZZ Plant",
    price: 599,
    categories: ["Indoor", "Low Light", "Air Purifying"],
    description: "Extremely low-maintenance plant that thrives in any condition.",
    care_instructions: "Low to bright light, water monthly",
    stock_quantity: 14,
    image: "https://via.placeholder.com/300x300?text=ZZ+Plant"
  },
  {
    name: "Fiddle Leaf Fig",
    price: 1299,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Statement plant with large, violin-shaped leaves.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 4,
    image: "https://via.placeholder.com/300x300?text=Fiddle+Leaf+Fig"
  },
  {
    name: "Pothos Golden",
    price: 199,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Trailing vine with heart-shaped variegated leaves.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 28,
    image: "https://via.placeholder.com/300x300?text=Pothos"
  },
  {
    name: "Areca Palm",
    price: 799,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "Elegant palm that adds tropical vibes to any space.",
    care_instructions: "Bright indirect light, keep soil moist",
    stock_quantity: 7,
    image: "https://via.placeholder.com/300x300?text=Areca+Palm"
  },
  {
    name: "English Ivy",
    price: 299,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Classic trailing plant with distinctive lobed leaves.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 22,
    image: "https://via.placeholder.com/300x300?text=English+Ivy"
  },
  {
    name: "Dracaena Marginata",
    price: 699,
    categories: ["Indoor", "Air Purifying", "Low Light"],
    description: "Dragon tree with spiky leaves and red edges.",
    care_instructions: "Low to bright light, water when dry",
    stock_quantity: 11,
    image: "https://via.placeholder.com/300x300?text=Dracaena"
  },
  {
    name: "Philodendron",
    price: 349,
    categories: ["Indoor", "Hanging", "Air Purifying"],
    description: "Heart-shaped leaves on trailing vines, very easy to grow.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 19,
    image: "https://via.placeholder.com/300x300?text=Philodendron"
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
    image: "https://via.placeholder.com/300x300?text=Bamboo+Palm"
  },
  {
    name: "Lavender",
    price: 399,
    categories: ["Outdoor", "Flowering", "Medicinal"],
    description: "Fragrant herb with purple flowers, perfect for gardens.",
    care_instructions: "Full sun, well-draining soil, moderate water",
    stock_quantity: 16,
    image: "https://via.placeholder.com/300x300?text=Lavender"
  },
  {
    name: "Rosemary",
    price: 299,
    categories: ["Outdoor", "Medicinal", "Small"],
    description: "Aromatic herb perfect for cooking and natural pest control.",
    care_instructions: "Full sun, well-draining soil, minimal water",
    stock_quantity: 24,
    image: "https://via.placeholder.com/300x300?text=Rosemary"
  },
  {
    name: "Marigold",
    price: 149,
    categories: ["Outdoor", "Flowering", "Small"],
    description: "Bright orange and yellow flowers, great for garden borders.",
    care_instructions: "Full sun, regular watering, deadhead spent flowers",
    stock_quantity: 40,
    image: "https://via.placeholder.com/300x300?text=Marigold"
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
    image: "https://via.placeholder.com/300x300?text=Bougainvillea"
  },
  {
    name: "Croton",
    price: 449,
    categories: ["Indoor", "Home Decor", "Outdoor"],
    description: "Colorful foliage plant with variegated leaves.",
    care_instructions: "Bright light, regular watering, high humidity",
    stock_quantity: 13,
    image: "https://via.placeholder.com/300x300?text=Croton"
  },
  {
    name: "Hibiscus",
    price: 399,
    categories: ["Outdoor", "Flowering", "Large"],
    description: "Large tropical flowers in various colors.",
    care_instructions: "Full sun, regular watering, fertile soil",
    stock_quantity: 12,
    image: "https://via.placeholder.com/300x300?text=Hibiscus"
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
    image: "https://via.placeholder.com/300x300?text=Christmas+Cactus"
  },
  {
    name: "Bird of Paradise",
    price: 1599,
    categories: ["Indoor", "Large", "Flowering"],
    description: "Exotic plant with large paddle-shaped leaves and orange bird-like flowers.",
    care_instructions: "Bright light, regular water, high humidity",
    stock_quantity: 3,
    image: "https://via.placeholder.com/300x300?text=Bird+of+Paradise"
  },
  {
    name: "Calathea",
    price: 649,
    categories: ["Indoor", "Home Decor", "Air Purifying"],
    description: "Prayer plant with beautiful patterned leaves.",
    care_instructions: "Bright indirect light, high humidity, distilled water",
    stock_quantity: 8,
    image: "https://via.placeholder.com/300x300?text=Calathea"
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
    image: "https://via.placeholder.com/300x300?text=Geranium"
  },
  {
    name: "Begonia",
    price: 299,
    categories: ["Outdoor", "Flowering", "Small"],
    description: "Colorful flowers with attractive foliage.",
    care_instructions: "Partial shade, moist soil, regular feeding",
    stock_quantity: 21,
    image: "https://via.placeholder.com/300x300?text=Begonia"
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
    image: "https://via.placeholder.com/300x300?text=String+of+Hearts"
  },
  {
    name: "Norfolk Pine",
    price: 1099,
    categories: ["Indoor", "Large", "Home Decor"],
    description: "Living Christmas tree that grows indoors year-round.",
    care_instructions: "Bright indirect light, regular watering, high humidity",
    stock_quantity: 4,
    image: "https://via.placeholder.com/300x300?text=Norfolk+Pine"
  },
  {
    name: "Ponytail Palm",
    price: 749,
    categories: ["Indoor", "Succulent", "Home Decor"],
    description: "Unique plant with swollen trunk and long, thin leaves.",
    care_instructions: "Bright light, minimal water, well-draining soil",
    stock_quantity: 9,
    image: "https://via.placeholder.com/300x300?text=Ponytail+Palm"
  },
  {
    name: "Air Plant",
    price: 199,
    categories: ["Indoor", "Small", "Air Purifying"],
    description: "Soilless plants that absorb nutrients from the air.",
    care_instructions: "Bright indirect light, mist 2-3 times weekly",
    stock_quantity: 38,
    image: "https://via.placeholder.com/300x300?text=Air+Plant"
  },
  {
    name: "Echeveria",
    price: 179,
    categories: ["Succulent", "Small", "Indoor"],
    description: "Rose-shaped succulent with thick, fleshy leaves.",
    care_instructions: "Bright light, minimal water, good drainage",
    stock_quantity: 42,
    image: "https://via.placeholder.com/300x300?text=Echeveria"
  },
  {
    name: "Chinese Evergreen",
    price: 549,
    categories: ["Indoor", "Low Light", "Air Purifying"],
    description: "Colorful foliage plant that tolerates low light.",
    care_instructions: "Low to bright indirect light, moderate water",
    stock_quantity: 11,
    image: "https://via.placeholder.com/300x300?text=Chinese+Evergreen"
  },
  {
    name: "Anthurium",
    price: 699,
    categories: ["Indoor", "Flowering", "Air Purifying"],
    description: "Glossy heart-shaped flowers in bright colors.",
    care_instructions: "Bright indirect light, high humidity, regular watering",
    stock_quantity: 8,
    image: "https://via.placeholder.com/300x300?text=Anthurium"
  },
  {
    name: "Peperomia",
    price: 299,
    categories: ["Indoor", "Small", "Pet Friendly"],
    description: "Compact plant with thick, waxy leaves in various patterns.",
    care_instructions: "Bright indirect light, water when topsoil is dry",
    stock_quantity: 25,
    image: "https://via.placeholder.com/300x300?text=Peperomia"
  },
  {
    name: "Schefflera",
    price: 599,
    categories: ["Indoor", "Air Purifying", "Large"],
    description: "Umbrella plant with glossy, palmate leaves.",
    care_instructions: "Bright indirect light, water weekly",
    stock_quantity: 10,
    image: "https://via.placeholder.com/300x300?text=Schefflera"
  },
  {
    name: "Haworthia",
    price: 229,
    categories: ["Succulent", "Small", "Indoor"],
    description: "Small succulent with distinctive white markings.",
    care_instructions: "Bright indirect light, minimal water",
    stock_quantity: 33,
    image: "https://via.placeholder.com/300x300?text=Haworthia"
  },
  {
    name: "Dieffenbachia",
    price: 449,
    categories: ["Indoor", "Large", "Air Purifying"],
    description: "Dumbcane with large, variegated leaves.",
    care_instructions: "Bright indirect light, moderate water",
    stock_quantity: 12,
    image: "https://via.placeholder.com/300x300?text=Dieffenbachia"
  },
  {
    name: "Maranta",
    price: 399,
    categories: ["Indoor", "Home Decor", "Pet Friendly"],
    description: "Prayer plant with beautiful patterned leaves that fold at night.",
    care_instructions: "Bright indirect light, high humidity, regular watering",
    stock_quantity: 15,
    image: "https://via.placeholder.com/300x300?text=Maranta"
  },
  {
    name: "Parlor Palm",
    price: 449,
    categories: ["Indoor", "Air Purifying", "Pet Friendly"],
    description: "Elegant small palm perfect for indoor spaces.",
    care_instructions: "Bright indirect light, regular watering",
    stock_quantity: 14,
    image: "https://via.placeholder.com/300x300?text=Parlor+Palm"
  },
  {
    name: "Bromeliad",
    price: 549,
    categories: ["Indoor", "Flowering", "Home Decor"],
    description: "Tropical plant with colorful bracts and unique flower structure.",
    care_instructions: "Bright indirect light, water in central cup",
    stock_quantity: 9,
    image: "https://via.placeholder.com/300x300?text=Bromeliad"
  },
  {
    name: "Clivia",
    price: 799,
    categories: ["Indoor", "Flowering", "Low Light"],
    description: "Elegant flowering plant with orange trumpet-shaped blooms.",
    care_instructions: "Bright indirect light, water moderately",
    stock_quantity: 6,
    image: "https://via.placeholder.com/300x300?text=Clivia"
  },
  {
    name: "Nerve Plant",
    price: 199,
    categories: ["Indoor", "Small", "Home Decor"],
    description: "Delicate plant with intricate white or pink veining on leaves.",
    care_instructions: "Bright indirect light, high humidity, consistent moisture",
    stock_quantity: 29,
    image: "https://via.placeholder.com/300x300?text=Nerve+Plant"
  },
  {
    name: "Hoya",
    price: 649,
    categories: ["Indoor", "Hanging", "Flowering"],
    description: "Wax plant with thick, waxy leaves and fragrant star-shaped flowers.",
    care_instructions: "Bright indirect light, water when dry",
    stock_quantity: 8,
    image: "https://via.placeholder.com/300x300?text=Hoya"
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
