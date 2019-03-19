const servicesDomain = process.env.SERVICES_DOMAIN ? `.${process.env.SERVICES_DOMAIN}` : '';


const details = {
  name: `http://details${servicesDomain}:9080`,
  endpoint: 'details',
  children: [],
};

const ratings = {
  name: `http://ratings${servicesDomain}:9080`,
  endpoint: 'ratings',
  children: [],
};

const reviews = {
  name: `http://reviews${servicesDomain}:9080`,
  endpoint: 'reviews',
  children: [ratings],
};

const productpage = {
  name: `http://details${servicesDomain}:9080`,
  endpoint: 'details',
  children: [details, reviews],
};


module.exports.services = {
  productpage,
  details,
  reviews,
};
