const express = require('express');
const router = require_local('services/json_router')();
const sec = require_local('services/security');

const queryById = require_local('domain/User/queries/byId');

const ROLES = sec.ROLES;

router.get('/users',
  sec.authenticate(),
  function(req) {
    return Promise.resolve([
      { name: 'Joe' }
    ]);
  });

router.get('/api/user',
  sec.authenticate(),
  function(req) {
    return queryById(req.user.account)
  });

module.exports = router;
