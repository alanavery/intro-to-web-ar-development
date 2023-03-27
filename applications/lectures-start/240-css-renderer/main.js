import { CSS3DObject } from '/applications/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import { mockWithVideo } from '../../libs/camera-mock.js';

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    mockWithVideo('/applications/assets/mock-videos/course-banner1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    const obj = new CSS3DObject(document.querySelector('#ar-div'));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  };
  start();
});
