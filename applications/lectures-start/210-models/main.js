const THREE = window.MINDAR.IMAGE.THREE;
import { mockWithVideo } from '../../libs/camera-mock.js';
import { loadGLTF } from '../../libs/loader.js';

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    mockWithVideo('../../assets/mock-videos/musicband1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/musicband.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight('#fff', '#bbbbff', 1);
    scene.add(light);

    const anchor = mindarThree.addAnchor(0);

    const gltf = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');

    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
    anchor.group.add(gltf.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
