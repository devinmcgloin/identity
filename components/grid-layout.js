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
  <div className="flex-auto w-full sm:w-1/2 lg:w-1/4">
    <div className="mr-2">
      {images.map((image) => (
        <div className="mb-3 border">
          <img className="object-contain w-full h-full" src={image} />
        </div>
      ))}
    </div>
  </div>
);

const GridList = ({ title, images }) => {
  let partitionedImages = partition(images);

  return (
    <div>
      <div className="flex flex-row flex-wrap h-screen mt-2">
        {partitionedImages.map((set) => (
          <ImageList images={set} />
        ))}
      </div>
    </div>
  );
};

export default GridList;
