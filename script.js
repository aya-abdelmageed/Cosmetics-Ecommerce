const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json';

let users = [];

try {
  const dbData = fs.readFileSync('public/DataBase/userDB.json');
  const parsed = JSON.parse(dbData);
  users = parsed.users || [];
} catch (err) {
  console.log('⚠️ No existing userDB.json found or no users available. Make sure users are already added.');
  users = []; 
}

const comments = [
  'Amazing product!',
  'Didn\'t work well for me.',
  'Would buy again.',
  'Good value for the price.',
  'Not as expected.',
  'Loved the color!',
  'Long-lasting and smooth.'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFakeReviews(products) {
  const reviews = [];
  let reviewId = 1;

  products.forEach(product => {
    const reviewCount = Math.floor(Math.random() * 3) + 1; 

    for (let i = 0; i < reviewCount; i++) {
      const user = getRandomItem(users);
      reviews.push({
        id: reviewId++,
        product_id: product.id,
        user_id: user.id,
        UserName: user.name,
        comment: getRandomItem(comments),
        stars: Math.floor(Math.random() * 5) + 1
      });
    }
  });

  return reviews;
}

async function fetchAndSave() {
  try {
    const response = await axios.get(API_URL);
    const products = response.data;

    const reviews = generateFakeReviews(products);

    const data = {
      users,
      products, 
      reviews
    };

    fs.writeFileSync('public/database/db.json', JSON.stringify(data, null, 2));
    console.log('✅ Products and reviews (with real users) saved to db.json');
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
  }
}

fetchAndSave();
