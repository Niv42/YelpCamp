const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

// Connect to DB
mongoose
  .connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('connection error: ', err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60354ad2b1a9cf164cf69299',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et atque modi quos minima non cupiditate illum fuga repudiandae explicabo eligendi. Eveniet soluta dolorem magni laborum hic quaerat quasi',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            'https://res.cloudinary.com/nm42/image/upload/v1614252898/YelpCamp/o52uul5rqk3mr4yvkqsg.jpg',
        },
        {
          url:
            'https://res.cloudinary.com/nm42/image/upload/v1614252898/YelpCamp/sa9oekxddpaylf0yf5id.jpg',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
