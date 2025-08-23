const Joi = require('joi');

const plantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().trim(),
  price: Joi.number().min(0).required(),
  categories: Joi.array().items(
    Joi.string().valid(
      'Indoor', 
      'Outdoor', 
      'Succulent', 
      'Air Purifying', 
      'Home Decor', 
      'Low Light', 
      'Pet Friendly', 
      'Flowering', 
      'Medicinal',
      'Hanging',
      'Large',
      'Small'
    )
  ).min(1).required(),
  availability: Joi.boolean(),
  description: Joi.string().max(500).allow(''),
  image: Joi.string().uri().allow(''),
  care_instructions: Joi.string().max(300).allow(''),
  stock_quantity: Joi.number().min(0).integer()
});

const validatePlant = (data) => {
  return plantSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validatePlant,
  plantSchema
};
