import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { GLTFLoader } from '../../libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js';
import { mockWithVideo, mockWithImage } from '../../libs/camera-mock.js';

document.addEventListener('DOMContentLoaded', async () => {
  mockWithVideo('../../assets/mock-videos/musicband1.mp4');
  // mockWithImage('/applications/assets/mock-videos/course-banner1.png');

  const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: '../../assets/targets/musicband.mind',
  });

  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(0);
  // anchor.group.add(plane); // THREE.Group

  const loader = new GLTFLoader();
  loader.load('../../assets/models/musicband-raccoon/scene.gltf', (gltf) => {
    // gltf.scene // THREE.Group
    anchor.group.add(gltf.scene);
  });

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
