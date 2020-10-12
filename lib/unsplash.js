import Unsplash, { toJson } from 'unsplash-js';

let unsplash;

const userStats = async () => {
  if (!unsplash) {
    unsplash = new Unsplash({
      accessKey: process.env.UNSPLASH_ACCESS_KEY,
    });
  }

  const userStats = await unsplash.users.statistics('devinmcgloin');
  const { downloads, views } = await toJson(userStats);

  let images = [];
  let currentBatchSize,
    batchSize = 10,
    page = 1;
  do {
    let currentBatch = await toJson(
      await unsplash.users.photos('devinmcgloin', page, batchSize, 'popular')
    );
    images = images.concat(currentBatch);
    currentBatchSize = currentBatch.length;
    page += 1;
  } while (batchSize == currentBatchSize);

  return {
    downloads: downloads.total,
    views: views.total,
    images: images,
  };
};

export { userStats };
