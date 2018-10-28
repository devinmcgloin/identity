const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const crypto = require('crypto');
const fs = require('fs');

exports.sourceNodes = async (
  { actions: { createNode, setPluginStatus }, createNodeId },
  { accessKey, secretKey }
) => {
  const unsplash = new Unsplash({
    applicationId: accessKey,
    secret: secretKey,
  });

  setPluginStatus({
    status: {
      lastFetched: new Date().toJSON(),
    },
  });

  const photos = await unsplash.users
    .photos('devinmcgloin', 1, 50, 'popular', false)
    .then(toJson);

  photos.map(photo => {
    console.log(photo);
    createNode({
      ...photo,
      parent: '__SOURCE__',
      children: [],
      internal: {
        type: 'UnsplashPhoto',
        content: JSON.stringify(photo),
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(photo))
          .digest('hex'),
      },
    });
  });

  return;
};
