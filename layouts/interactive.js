import { useEffect } from 'react';
import Tweakpane from 'tweakpane';
import Link from 'next/link';

const InteractiveLayout = ({ title, description, mountEditor, color }) => {
  useEffect(() => {
    if (mountEditor) {
      const pane = new Tweakpane({
        title: 'Parameters',
        container: document.getElementById('tweakpane'),
      });

      mountEditor(pane);
      // pane.hidden = true;
      return () => pane.dispose();
    }
  }, []);

  return (
    <main
      className="w-screen h-screen border-8 border-white"
      style={{ backgroundColor: color }}
    >
      <div id="tweakpane" className="absolute top-4 right-4"></div>
      <canvas className="display-block overflow-hidden" id="canvas" />
      <div className="absolute font-serif text-white font-normal italic md:left-16 md:bottom-16 bottom-10 left-10 p-5 md:max-w-sm max-w-xs bg-opacity-25 bg-black rounded-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl">{title}</h1>
          <span>·</span>
          <Link href="/art">
            <a className="border-b border-dotted text-sm">View All</a>
          </Link>
        </div>
        <span>{description}</span>
      </div>
    </main>
  );
};
export default InteractiveLayout;
