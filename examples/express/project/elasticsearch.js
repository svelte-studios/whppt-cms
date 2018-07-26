// each project can point to its own database

const configs = {
  development: {
    host: "http://elastic:changeme@localhost:9200",
    log: "error"
  },

  staging: {
    host: [
      { host: "", auth: "elastic:changeme", protocol: "http", port: 9200 }
    ],
    log: "error" //'trace'
  },

  production: {
    host: [
      { host: "", auth: "elastic:changeme", protocol: "http", port: 9200 }
    ],
    log: "error" //'trace'
  }
};

console.log("Loading ElasticSearch Config for ", process.env.NODE_ENV);
module.exports = configs[process.env.NODE_ENV];
