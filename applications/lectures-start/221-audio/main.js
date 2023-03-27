import { mockWithVideo } from '../../libs/camera-mock.js';
import { loadGLTF } from '../../libs/loader.js';
import { loadAudio } from '../../libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    mockWithVideo('/applications/assets/mock-videos/musicband1.mp4');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/musicband.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const raccoon = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    const audioClip = await loadAudio('/applications/assets/sounds/musicband-background.mp3');

    const listener = new THREE.AudioListener();

    const audio = new THREE.PositionalAudio(listener);

    camera.add(listener);
    anchor.group.add(audio);

    audio.setRefDistance(100);
    audio.setBuffer(audioClip);
    audio.setLoop(true);

    anchor.onTargetFound = () => {
      audio.play();
    };

    anchor.onTargetLost = () => {
      audio.pause();
    };

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
