export default ({ $JsonRouter, $security, $image_uploader, $db, $ROLES }) => {
  const router = $JsonRouter();

  router.post(
    "/api/project/:projectId/image",
    $security.authenticate(),
    $security.authorise.project("projectId", $ROLES.READ),
    req => {
      const projectId = req.params.projectId;
      const image_file = req.files.image_file;

      return $image_uploader(projectId, image_file).then(image => {
        return $db.Image.save({ projectId, image }).then(result => {
          return {
            store: image.store,
            id: result.id,
            url: image.url,
            meta: image.meta
          };
        });
      });
    }
  );

  return router;
};
