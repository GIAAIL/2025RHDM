import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

export function loadPlyChapter(map, tb) {
  const container = document.createElement("div");
  container.id = "ply-viewer";
  container.style.width = "100%";
  container.style.height = "500px";
  container.style.position = "relative";
  container.style.display = "none"; // 初始隱藏，等到進入章節才顯示
  document.getElementById("features").appendChild(container);

  let renderer, scene, camera, model;

  function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const textureLoader = new THREE.TextureLoader();
    const plyLoader = new PLYLoader();

    textureLoader.load("assets/modelTexture.png", (texture) => {
      plyLoader.load("assets/model.ply", (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ map: texture });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
      });
    });

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.005;
    renderer.render(scene, camera);
  }

  // 加入 Scroll Event Hooks
  const chapterId = "ply-chapter";
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.style.display = "block";
          if (!renderer) initThree();
        } else {
          container.style.display = "none";
        }
      });
    },
    { threshold: 0.5 }
  );

  const target = document.getElementById(chapterId);
  if (target) observer.observe(target);
}
