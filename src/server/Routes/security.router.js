const express = require('express');
const router = require_local('services/json_router')();
const sec = require_local('services/security');
const createCommand = require_local('domain/User/commands/create');

const ROLES = sec.ROLES;


router.post('/api/signup', function(req) {
  return createCommand.handle(req.body).then(result => {
    return sec.login(result)
  });
});

router.post('/api/login', function(req) {
  return sec.login(req.body)
});

router.get('/sessions/test',
  sec.authenticate(),
  (req, res) => {
    return Promise.resolve({ test: 'Success' });
  });

module.exports = router;
