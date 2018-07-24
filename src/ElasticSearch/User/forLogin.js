export default ({ $elastic, $options }) => {
  let index = "whppt";
  const type = "user";

  if ($options && $options.index_suffix)
    index = `whppt_${$options.index_suffix}` || "";

  return ({ $projects }, { email, password }) => {
    return $elastic
      .search({
        index,
        type,
        body: {
          query: {
            bool: {
              must: [
                { match: { email: email } },
                { match: { password: password } }
              ]
            }
          }
        }
      })
      .then(response => {
        if (!response.hits.hits.length) {
          throw new Error(
            "Could not validate your credentials. Not Authorised"
          );
        }
        return response.hits.hits[0];
      });
    //   return dgraph
    //     .query(
    //       `
    //     {
    //       user(func: eq(email, "${email}"))
    //       {
    //         uid
    //         id
    //         email
    //         password
    //         roles: role {
    //           name
    //         }
    //         admin{
    //           name
    //           id
    //           key
    //         }
    //         read{
    //           name
    //           id
    //           key
    //         }
    //         edit{
    //           name
    //           id
    //           key
    //         }
    //         own {
    //           name
    //           id
    //           key
    //         }
    //       }
    //     }
    //     `
    //     )
    //     .then(results => {
    //       if (!results.user[0]) throw new Error("Invalid login credentials");
    //
    //       const user = {
    //         id: results.user[0].id,
    //         email: results.user[0].email,
    //         password: results.user[0].password
    //       };
    //
    //       const perms = {
    //         admin: results.user[0].admin || [],
    //         read: results.user[0].read || [],
    //         edit: results.user[0].edit || [],
    //         own: results.user[0].own || []
    //       };
    //
    //       user.projects = _.reduce(
    //         perms,
    //         (result, permVal, permKey) => {
    //           _.each(permVal, v => {
    //             // let project = result[v.id]
    //             let project = _.find(result, { id: v.id });
    //
    //             if (!project) {
    //               project = {
    //                 id: v.id,
    //                 key: v.key,
    //                 name: v.name,
    //                 permissions: []
    //               };
    //               result.push(project);
    //             }
    //
    //             project.permissions.push(permKey);
    //           });
    //           return result;
    //         },
    //         []
    //       );
    //
    //       return user;
    //     });
  };
};
