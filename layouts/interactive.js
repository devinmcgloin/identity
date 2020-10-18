import { useEffect } from 'react';
import Tweakpane from 'tweakpane';
import Link from 'next/link';
import { CommonMetadata } from 'components/metadata';

const InteractiveLayout = ({ title, description, mountEditor }) => {
  const download = () => {
    var canvas = document.getElementById('canvas');

    var image = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = `${title.split(' ').join('-').toLowerCase()}-${Math.floor(
      new Date().getTime() / 100000
    )}.png`;
    link.href = image;
    link.click();
  };

  useEffect(() => {
    const pane = new Tweakpane({
      title: 'Parameters',
      container: document.getElementById('tweakpane'),
    });

    mountEditor && mountEditor(pane);
    pane.addSeparator();
    pane.addButton({ title: 'Download' }).on('click', () => download());
    return () => pane.dispose();
  }, []);

  return (
    <main className="w-screen h-screen border-8 border-white">
      <CommonMetadata title={title} description={description} />

      <div id="tweakpane" className="absolute top-4 right-4"></div>
      <canvas className="display-block overflow-hidden" id="canvas" />
      <div className="absolute font-serif text-white font-normal italic md:left-16 md:bottom-16 bottom-10 left-10 p-5 md:max-w-sm max-w-xs bg-opacity-25 bg-black rounded-sm">
        <div className="flex items-center space-x-2">
          <h1 className="md:text-3xl text-xl">{title}</h1>
          <span>·</span>
          <Link href="/art">
            <a className="border-b border-dotted text-sm">View All</a>
          </Link>
        </div>
        <span className="md:text-normal text-sm">{description}</span>
      </div>
    </main>
  );
};
export default InteractiveLayout;
