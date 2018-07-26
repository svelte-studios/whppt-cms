import $JsonRouter from "express-promise-json-router";

import Config from "./Config";
import security from "./security";
import Routes from "./Routes";
import $Id from "./id";
import Database from "./Database";
import $logger from "./logger";

const $config = Config({ $logger });
const $projects = $config.projects;
const $db = Database({ $projects, $Id, $logger, $config });
const $security = security({ $db, $logger, $config });
const $createAccessToken = $security.createAccessToken;
const $decodeAccessToken = $security.decodeAccessToken;
const $authenticate = $security.authenticate;
const $authorise = $security.authorize;
const $ROLES = $security.ROLES;
const $routes = Routes({
  $JsonRouter,
  $security,
  $authenticate,
  $authorise,
  $db,
  $ROLES,
  $projects,
  $createAccessToken,
  $decodeAccessToken
});

export { $config, $createAccessToken, $routes };
