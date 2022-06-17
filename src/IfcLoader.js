/*import * as THREE from 'three';
import { IFCLoader } from 'three/examples/jsm/loaders/ifc/web-ifc-api';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';

const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath("ifcLib/");
  const input = document.getElementById("file-input");
  input.addEventListener(
    "change",
    (changed) => {
      const file = changed.target.files[0];
      var ifcURL = URL.createObjectURL(file);
      ifcLoader.load(
            ifcURL,
            (ifcModel) => scene.add(ifcModel.mesh));
    },
    false
  );

export default sceneObject2*/