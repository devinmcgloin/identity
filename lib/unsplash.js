import { createApi } from 'unsplash-js';

let unsplash;

const userPhotos = async () => {
  if (!unsplash) {
    unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
  }

  let images = [];
  let currentBatchSize,
    batchSize = 10,
    page = 1;
  do {
    let response = await unsplash.users.getPhotos({
      username: 'devinmcgloin',
      page: page,
      perPage: batchSize,
    });

    let currentBatch = response.response.results;
    images = images.concat(currentBatch);
    currentBatchSize = currentBatch.length;
    page += 1;
  } while (batchSize == currentBatchSize);

  return {
    images: images,
  };
};

export { userPhotos };
