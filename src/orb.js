import * as THREE from "three";

export function initOrb(canvas, reducedMotion) {
  const stage = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = 5.2;
  const group = new THREE.Group();
  scene.add(group);
  const count = matchMedia("(max-width:600px)").matches ? 1600 : 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color("#b9d574"),
    new THREE.Color("#659897"),
    new THREE.Color("#375a46"),
    new THREE.Color("#e1eeac"),
  ];
  let seed = 2026;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * random() - 1),
      theta = random() * Math.PI * 2,
      r = 1.18 * Math.pow(random(), 0.14);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const color = palette[Math.floor(random() * palette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  pointGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 64;
  textureCanvas.height = 64;
  const ctx = textureCanvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.15, "rgba(255,255,255,.95)");
  gradient.addColorStop(0.4, "rgba(255,255,255,.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(textureCanvas);
  // A luminous center and fine local connections make the globe read as a
  // connected intelligence network, rather than an evenly filled particle ball.
  const nucleus = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      color: "#d8ff69",
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  nucleus.scale.set(0.82, 0.82, 1);
  nucleus.position.set(0.1, -0.05, 0.55);
  group.add(nucleus);
  const connectionPositions = [];
  for (let i = 0; i < count; i += 9) {
    const a = new THREE.Vector3().fromArray(positions, i * 3);
    for (let j = i + 1; j < Math.min(count, i + 60); j++) {
      const b = new THREE.Vector3().fromArray(positions, j * 3);
      if (a.distanceToSquared(b) < 0.13) {
        connectionPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        break;
      }
    }
  }
  const connectionGeometry = new THREE.BufferGeometry();
  connectionGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(connectionPositions, 3),
  );
  group.add(
    new THREE.LineSegments(
      connectionGeometry,
      new THREE.LineBasicMaterial({
        color: "#b2d4a2",
        transparent: true,
        opacity: 0.19,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  const points = new THREE.Points(
    pointGeometry,
    new THREE.PointsMaterial({
      size: 0.072,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(points);
  const brightGeometry = new THREE.BufferGeometry();
  const brightPositions = new Float32Array(48 * 3);
  const brightColors = new Float32Array(48 * 3);
  for (let i = 0; i < 48; i++) {
    const source = (i * 53) % count;
    for (let j = 0; j < 3; j++) {
      brightPositions[i * 3 + j] = positions[source * 3 + j];
      brightColors[i * 3 + j] =
        palette[i % 2 === 0 ? 0 : 3][["r", "g", "b"][j]];
    }
  }
  brightGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(brightPositions, 3),
  );
  brightGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(brightColors, 3),
  );
  group.add(
    new THREE.Points(
      brightGeometry,
      new THREE.PointsMaterial({
        size: 0.24,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ),
  );
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.19, 48, 32),
    new THREE.MeshBasicMaterial({
      color: "#395e51",
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    }),
  );
  group.add(shell);
  const orbitLights = [];
  for (let j = 0; j < 2; j++) {
    const curvePoints = [];
    for (let i = 0; i <= 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      curvePoints.push(
        new THREE.Vector3(Math.cos(a) * 1.65, Math.sin(a) * 1.35, 0),
      );
    }
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curvePoints),
      new THREE.LineBasicMaterial({
        color: j % 2 ? "#86a85e" : "#538c83",
        transparent: true,
        opacity: 0.25,
      }),
    );
    ring.rotation.x = 1.08 + j * 0.9;
    ring.rotation.y = 0.4 + j * 0.7;
    ring.rotation.z = -0.4;
    group.add(ring);
    const light = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: "#cfe5b7",
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    light.scale.set(0.2, 0.2, 1);
    ring.add(light);
    orbitLights.push(light);
  }
  const ambientGeometry = new THREE.BufferGeometry();
  const ambientPositions = new Float32Array(120 * 3);
  for (let i = 0; i < ambientPositions.length; i++)
    ambientPositions[i] = (random() - 0.5) * 6;
  ambientGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(ambientPositions, 3),
  );
  const dust = new THREE.Points(
    ambientGeometry,
    new THREE.PointsMaterial({
      size: 0.018,
      map: texture,
      color: "#b1c797",
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    }),
  );
  scene.add(dust);
  const scatterGeometry = new THREE.BufferGeometry();
  const scatterPositions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = positions[i * 3];
    scatterPositions[i * 3] = x * 4.6;
    scatterPositions[i * 3 + 1] =
      positions[i * 3 + 1] * 0.8 + Math.sin(x * 3.5) * 0.85;
    scatterPositions[i * 3 + 2] = positions[i * 3 + 2] * 1.8;
  }
  scatterGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(scatterPositions, 3),
  );
  scatterGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors.slice(), 3),
  );
  const scatterMaterial = new THREE.PointsMaterial({
    size: 0.055,
    map: texture,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const scatter = new THREE.Points(scatterGeometry, scatterMaterial);
  scene.add(scatter);
  const helix = new THREE.Group();
  const helixMaterials = [];
  for (let arm = 0; arm < 2; arm++) {
    const linePoints = [];
    for (let i = 0; i <= 180; i++) {
      const y = (i / 180) * 8;
      const angle = y * 1.85 + arm * Math.PI;
      linePoints.push(
        new THREE.Vector3(Math.sin(angle) * 0.67, y, Math.cos(angle) * 0.5),
      );
    }
    const material = new THREE.LineBasicMaterial({
      color: arm ? "#182e19" : "#3d873b",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    helixMaterials.push(material);
    helix.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        material,
      ),
    );
  }
  scene.add(helix);
  let storyState = {
    cinematic: false,
    spin: 0,
    spread: 0,
    lower: 0,
    grow: 1,
    assemble: 1,
    helix: 0,
  };
  let idleRotation = 0;
  let visible = false,
    raf = 0,
    last = 0,
    pointerX = 0,
    pointerY = 0;
  const resize = () => {
    const width = stage.clientWidth,
      height = stage.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  new ResizeObserver(resize).observe(stage);
  resize();
  const render = (time) => {
    const storyTime = Number(stage.parentElement.dataset.time || 0);
    if (
      !visible ||
      document.hidden ||
      (storyState.cinematic && (storyTime < 19 || storyTime > 31))
    ) {
      raf = 0;
      return;
    }
    if (time - last > 30) {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      if (!reducedMotion.matches) {
        idleRotation += dt * 0.13;
        group.rotation.y =
          (storyState.cinematic ? 0 : idleRotation) + storyState.spin;
        group.rotation.x += (pointerY * 0.14 - group.rotation.x) * 0.035;
        group.rotation.z += (pointerX * 0.09 - group.rotation.z) * 0.035;
        dust.rotation.y -= dt * 0.015;
        group.position.y = storyState.cinematic
          ? -0.4 - storyState.lower * 2.15
          : 0;
        group.scale.setScalar(storyState.grow);
        scatterMaterial.opacity = Math.min(0.85, storyState.spread * 0.65);
        scatter.scale.setScalar(1 + storyState.spread * 0.22);
        scatter.rotation.z = Math.sin(storyState.spin * 0.65) * 0.13;
        scatter.position.y = group.position.y + 0.4;
        helix.position.y = group.position.y + 0.65;
        helix.rotation.y = storyState.spin * 0.18;
        helixMaterials.forEach((material) => {
          material.opacity = (storyState.helix || 0) * 0.65;
        });
        orbitLights.forEach((light, i) => {
          const a =
            storyState.spin * 1.6 +
            (storyState.cinematic ? 0 : idleRotation * 2) +
            i * 2;
          light.position.set(Math.cos(a) * 1.65, Math.sin(a) * 1.35, 0);
        });
        points.material.opacity = 0.95 * (storyState.assemble ?? 1);
        nucleus.material.opacity = 0.9 * (storyState.assemble ?? 1);
      }
      renderer.render(scene, camera);
    }
    if (!reducedMotion.matches) raf = requestAnimationFrame(render);
    else raf = 0;
  };
  const run = () => {
    if (visible && !document.hidden && !raf)
      raf = requestAnimationFrame(render);
  };
  stage.addEventListener("story-orbit", (event) => {
    storyState = event.detail;
    camera.position.z = storyState.cinematic ? 9.7 : 5.2;
    run();
  });
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      run();
    },
    { threshold: 0.01 },
  ).observe(stage);
  document.addEventListener("visibilitychange", run);
  reducedMotion.addEventListener("change", run);
  if (matchMedia("(hover:hover) and (pointer:fine)").matches)
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      pointerX = (e.clientX - r.left) / r.width - 0.5;
      pointerY = (e.clientY - r.top) / r.height - 0.5;
    });
  stage.classList.add("webgl-ready");
}
