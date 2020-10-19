const partition = (array, n = 4) => {
  let cop = [...array];
  var container = new Array(n);

  for (var i = 0; i < container.length; i++) {
    container[i] = new Array();
  }

  let item = cop.pop();
  let cursor = 0;
  while (item) {
    container[cursor].push(item);
    cursor += 1;
    cursor %= container.length;
    item = cop.pop();
  }

  return container;
};

const ImageList = ({ images }) => (
  <div className="flex-auto w-full sm:w-1/2 lg:w-1/3">
    <div className="mx-1">
      {images.map((image) => (
        <div
          key={image}
          className="mb-2 p-2 border border-gray-300 dark:border-gray-400 dark:bg-white"
        >
          <img className="object-contain w-full h-full" src={image} />
        </div>
      ))}
    </div>
  </div>
);

const GridList = ({ images }) => {
  let partitionedImages = partition(images, 3);

  return (
    <div>
      <div className="flex flex-row flex-wrap h-screen mt-4">
        {partitionedImages.map((set, index) => (
          <ImageList key={index} images={set} />
        ))}
      </div>
    </div>
  );
};

export default GridList;
