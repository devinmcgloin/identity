import { useEffect } from 'react';

let dat = null;
if (typeof window !== 'undefined') {
  dat = require('dat.gui');
}

const InteractiveLayout = ({ mountDatGUI, color }) => {
  useEffect(() => {
    if (mountDatGUI) {
      const datgui = new dat.GUI({ autoPlace: false });
      const dat_gui = document.getElementById('dat-gui');
      dat_gui.appendChild(datgui.domElement);
      mountDatGUI(datgui);
    }
  }, []);

  return (
    <main
      className="w-screen h-screen border-8 border-white"
      style={{ backgroundColor: color }}
    >
      {mountDatGUI && <div className="absolute z-10 right-0" id="dat-gui" />}
      <canvas className="display-block overflow-hidden" id="canvas" />
    </main>
  );
};
export default InteractiveLayout;
