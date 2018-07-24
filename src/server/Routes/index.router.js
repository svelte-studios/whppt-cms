const express = require('express');
const router = require_local('services/json_router')();
const sec = require_local('services/security');

router.get('/', function(req) {
  return Promise.resolve({ api: 'V-0.3' });
});

module.exports = router;
