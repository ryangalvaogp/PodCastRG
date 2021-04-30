module.exports = {
    images:{
        domains:['storage.googleapis.com'],
    },
    future: {
    webpack5: true,
  },
  env:{
    AMBIENTE:'desenvolvimento',
    BASE_URL_API_LOCAL:'http://localhost:4444/',
    BASE_URL_API_PROD:'none',
    API_SOURCE:'API_REST_FULL',
    //API_SOURCE:'JSON_SERVER', 
  }
};