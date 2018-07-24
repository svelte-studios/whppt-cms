import { map } from "lodash";

export default ({ $Id, $logger, $config, $projects }) => {
  const UserContext = () => {
    return {
      User: $config.db.User,
      context: { $Id, $logger }
    };
  };
  const rootUser =
    $config && $config.security && $config.security.rootUser
      ? $config.security.rootUser
      : undefined;

  return {
    forLogin: ({ email, password }) => {
      if (rootUser && email === rootUser.id && password === rootUser.password)
        return Promise.resolve({
          id: rootUser.id,
          email: rootUser.email,
          projects: map($projects, p => ({
            id: p.id,
            name: p.name,
            permissions: ["own", "admin", "edit", "read"]
          }))
        });

      const { User, context } = UserContext();
      return User.forLogin(context, { email, password });
    }
  };
};
