// @ts-nocheck
// The seven shops as a 3D ring of shelving units for the home page hero.
// Each unit fills with stock when the page loads; the ring turns slowly, can be dragged round,
// and tapping a shop's unit opens that shop's page.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

type RingShop = { slug: string; name: string; bg: string; fg: string };

const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);
const outB = (t) => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; };
const back = (t) => { const c = 1.5; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
function rng(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }

// Stock per shop, row by row from the floor up
const ROWS = {
  grocery: ['tin', 'jar', 'tall', 'tin', 'bottle'],
  'non-grocery': ['roll', 'bottle', 'box', 'bottle', 'tin'],
  toys: ['bigbox', 'ball', 'box', 'bigbox', 'ball'],
  poundshop: ['box', 'tin', 'bottle', 'jar', 'box'],
  stationery: ['book', 'jar', 'book', 'box', 'book'],
  convenience: ['can', 'pack', 'bottle', 'can', 'pack'],
  'card-and-gift': ['card', 'card', 'bag', 'card', 'bag'],
};
const PAL_ROW = { grocery: 0, 'non-grocery': 1, toys: 2, poundshop: 3, stationery: 4, convenience: 5, 'card-and-gift': 6 };

export function startShopRing(host: HTMLElement, shopsIn: RingShop[], onPick: (slug: string) => void, opts: { reduced?: boolean } = {}) {
  const R = rng(31);
  const reduced = !!opts.reduced;
  const mem = (navigator as any).deviceMemory || 8, cores = navigator.hardwareConcurrency || 8;
  const LOW = mem <= 4 || cores <= 4;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';
  host.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, LOW ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = !LOW;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight('#ffffff', '#f0c9c9', 0.55));
  const sun = new THREE.DirectionalLight('#fff6ea', 2.0);
  sun.position.set(4, 12, 7); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03;
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
  scene.add(sun);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  // soft shadow on the red background
  const catcher = new THREE.Mesh(new THREE.CircleGeometry(6.2, 48), new THREE.ShadowMaterial({ opacity: 0.22 }));
  catcher.rotation.x = -Math.PI / 2; catcher.receiveShadow = true; scene.add(catcher);
  {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    const gr = g.createRadialGradient(128, 128, 40, 128, 128, 128); gr.addColorStop(0, 'rgba(60,0,0,.35)'); gr.addColorStop(1, 'rgba(60,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.y = 0.004; scene.add(m);
  }

  const ring = new THREE.Group(); scene.add(ring);
  const NSH = shopsIn.length, BW = 1.6, SW = BW * 2, UH = 2.15, SD = 0.42, NR = 5;
  const AP = SW / (2 * Math.tan(Math.PI / NSH)) + 0.35;
  const shelfY = (i) => 0.16 + i * 0.41;
  const mWhite = new THREE.MeshStandardMaterial({ color: '#f7f7f5', roughness: 0.45 });
  const mBack = new THREE.MeshStandardMaterial({ color: '#ececea', roughness: 0.7 });
  const mStrip = new THREE.MeshStandardMaterial({ color: '#c42a3a', roughness: 0.5 });
  const geoCache = {};
  const box = (w, h, d) => geoCache[`${w}|${h}|${d}`] || (geoCache[`${w}|${h}|${d}`] = new THREE.BoxGeometry(w, h, d));

  function signTex(name, bg, fg, num) {
    const c = document.createElement('canvas'); c.width = 1536; c.height = 224; const g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, 1536, 224);
    g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(0, 0, 1536, 10);
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    let size = 120; g.font = `800 ${size}px "Bricolage Grotesque Variable", system-ui, sans-serif`;
    while (g.measureText(name).width > 1240 && size > 60) { size -= 4; g.font = `800 ${size}px "Bricolage Grotesque Variable", system-ui, sans-serif`; }
    g.fillText(name, 768, 120);
    g.globalAlpha = 0.65; g.font = '800 36px "Albert Sans Variable", system-ui, sans-serif'; g.textAlign = 'left'; g.fillText(num, 46, 118); g.globalAlpha = 1;
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
  }

  const pickables = [];
  const shops = shopsIn.map((S, i) => {
    const a = (i / NSH) * Math.PI * 2;
    const g = new THREE.Group();
    g.position.set(Math.sin(a) * AP, 0, Math.cos(a) * AP); g.rotation.y = a; // facing outwards
    ring.add(g);
    const add = (geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); o.userData.slug = S.slug; pickables.push(o); return o; };
    add(box(SW, UH, 0.03), mBack, 0, UH / 2, -0.015);
    [-SW / 2 + 0.025, 0, SW / 2 - 0.025].forEach((x) => add(box(0.05, UH, 0.06), mWhite, x, UH / 2, 0.01));
    add(box(SW, 0.14, SD + 0.04), mWhite, 0, 0.07, SD / 2 - 0.02);
    for (let r = 1; r < NR; r++) { add(box(SW, 0.025, SD), mWhite, 0, shelfY(r), SD / 2); add(box(SW, 0.026, 0.01), mStrip, 0, shelfY(r) - 0.005, SD + 0.006); }
    add(box(SW, 0.026, 0.01), mStrip, 0, 0.12, SD + 0.03);
    [-1, 1].forEach((s) => add(box(0.04, UH + 0.05, SD + 0.06), mWhite, s * (SW / 2 + 0.02), UH / 2, SD / 2 - 0.01));
    const sm = new THREE.MeshBasicMaterial({ map: signTex(S.name, S.bg, S.fg, '0' + (i + 1)) }); sm.toneMapped = false;
    const sign = new THREE.Group();
    const board = new THREE.Mesh(new RoundedBoxGeometry(SW + 0.04, 0.5, 0.1, 2, 0.03), new THREE.MeshStandardMaterial({ color: S.bg, roughness: 0.4 }));
    board.castShadow = true; board.userData.slug = S.slug; pickables.push(board); sign.add(board);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(SW, 0.46), sm); face.position.z = 0.052; face.userData.slug = S.slug; pickables.push(face); sign.add(face);
    sign.position.set(0, UH + 0.42, 0.06); g.add(sign);
    [-1, 1].forEach((s) => { const p = new THREE.Mesh(box(0.024, 0.3, 0.024), mWhite); p.position.set(s * (SW / 2 - 0.3), UH + 0.07, 0.04); g.add(p); });
    return { S, g, a, sign, i };
  });

  // packaging atlas 8x8
  const PALS = [
    [['#b3261e', '#ffd27a'], ['#2e7d32', '#fff3d6'], ['#f2b134', '#7a2e0e'], ['#7a2e0e', '#f7d08a'], ['#c0392b', '#ffffff'], ['#e67e22', '#3e2723'], ['#556b2f', '#f1e3b3'], ['#8e1b1b', '#ffcf40']],
    [['#1d5fd1', '#ffffff'], ['#2fb7e8', '#0b3d91'], ['#ffffff', '#1d5fd1'], ['#16a34a', '#ffffff'], ['#e7eef7', '#1d5fd1'], ['#7e57c2', '#ffffff'], ['#00a3a3', '#ffffff'], ['#ff5a1f', '#ffffff']],
    [['#e1061b', '#ffd200'], ['#2a6dd9', '#ffd200'], ['#ff7a1a', '#ffffff'], ['#16a34a', '#ffd200'], ['#7b3fc4', '#ffffff'], ['#ff4f9a', '#ffffff'], ['#00b4d8', '#ffd200'], ['#ffd200', '#e1061b']],
    [['#e1061b', '#ffffff'], ['#1d5fd1', '#ffd200'], ['#2b2b2b', '#ffd200'], ['#16784f', '#ffffff'], ['#ff4f9a', '#ffffff'], ['#f2b134', '#2b2b2b'], ['#7b3fc4', '#ffd200'], ['#00a3a3', '#ffffff']],
    [['#6b2fa3', '#ffffff'], ['#1a1a1a', '#ffd200'], ['#e83e8c', '#ffffff'], ['#2a6dd9', '#ffffff'], ['#f6c90e', '#1a1a1a'], ['#16a34a', '#ffffff'], ['#ff7a1a', '#ffffff'], ['#e1061b', '#ffffff']],
    [['#d4142a', '#ffffff'], ['#0e4a8a', '#ffffff'], ['#f6c90e', '#d4142a'], ['#2b2b2b', '#e1061b'], ['#16a34a', '#ffffff'], ['#ff7a1a', '#0e4a8a'], ['#7b3fc4', '#ffd200'], ['#00a3e0', '#ffffff']],
    [['#ffffff', '#e83e8c'], ['#fbe3ea', '#b0174f'], ['#ffffff', '#6b2fa3'], ['#f6e7c1', '#b8860b'], ['#ffffff', '#1d5fd1'], ['#e8f5e9', '#2e7d32'], ['#ffffff', '#e1061b'], ['#fff3e0', '#ef6c00']],
  ];
  const AT = document.createElement('canvas'); AT.width = AT.height = 1024; const ag = AT.getContext('2d');
  for (let row = 0; row < 8; row++) for (let col = 0; col < 8; col++) {
    const x = col * 128, y = row * 128; const P = PALS[row] || PALS[0]; const [c1, c2] = P[col % P.length]; const st = (col + row) % 4;
    ag.fillStyle = c1; ag.fillRect(x, y, 128, 128); ag.save(); ag.beginPath(); ag.rect(x + 3, y + 3, 122, 122); ag.clip();
    if (row === 6) {
      ag.fillStyle = c2;
      if (st === 0) { ag.beginPath(); ag.arc(x + 64, y + 56, 26, 0, 7); ag.fill(); }
      else if (st === 1) { for (let k = 0; k < 5; k++) { ag.beginPath(); ag.arc(x + 30 + k * 17, y + 40 + (k % 2) * 22, 8, 0, 7); ag.fill(); } }
      else if (st === 2) { ag.fillRect(x + 28, y + 30, 72, 10); ag.fillRect(x + 40, y + 48, 48, 8); ag.beginPath(); ag.moveTo(x + 64, y + 66); ag.lineTo(x + 84, y + 96); ag.lineTo(x + 44, y + 96); ag.fill(); }
      else { ag.beginPath(); const cx = x + 64, cy = y + 60; for (let k = 0; k < 10; k++) { const r = k % 2 ? 12 : 28, an = (k / 10) * Math.PI * 2 - Math.PI / 2; ag.lineTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); } ag.fill(); }
      ag.fillStyle = 'rgba(0,0,0,.35)'; ag.fillRect(x + 34, y + 106, 60, 5);
    } else if (row === 7) { ag.fillStyle = '#fbfbfb'; ag.fillRect(x, y, 128, 128); ag.fillStyle = '#dfe7f3'; ag.fillRect(x, y + 50, 128, 30); }
    else if (st === 0) { ag.fillStyle = c2; ag.fillRect(x, y + 40, 128, 46); ag.fillStyle = 'rgba(0,0,0,.5)'; ag.fillRect(x + 20, y + 54, 88, 8); ag.fillRect(x + 20, y + 68, 60, 6); }
    else if (st === 1) { ag.fillStyle = c2; ag.beginPath(); ag.arc(x + 64, y + 62, 34, 0, 7); ag.fill(); ag.fillStyle = c1; ag.fillRect(x + 44, y + 56, 40, 7); ag.fillRect(x + 50, y + 68, 28, 5); }
    else if (st === 2) { ag.fillStyle = c2; for (let k = -2; k < 6; k++) { ag.beginPath(); ag.moveTo(x + k * 36, y + 128); ag.lineTo(x + k * 36 + 16, y + 128); ag.lineTo(x + k * 36 + 144, y); ag.lineTo(x + k * 36 + 128, y); ag.fill(); } ag.fillStyle = '#fff'; ag.fillRect(x + 22, y + 46, 84, 38); ag.fillStyle = c1; ag.fillRect(x + 30, y + 57, 68, 8); }
    else { const gr = ag.createLinearGradient(x, y, x, y + 128); gr.addColorStop(0, c1); gr.addColorStop(1, c2); ag.fillStyle = gr; ag.fillRect(x, y, 128, 128); ag.fillStyle = '#fff'; ag.fillRect(x, y + 14, 128, 22); ag.fillStyle = c1; ag.fillRect(x + 16, y + 21, 70, 8); }
    ag.restore();
  }
  const atlas = new THREE.CanvasTexture(AT); atlas.colorSpace = THREE.SRGBColorSpace; atlas.anisotropy = 8;

  const lathe = (pts, seg = 14) => new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
  const G = {
    box: new RoundedBoxGeometry(1, 1, 1, 2, 0.07),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 16),
    bottle: lathe([[0, 0], [0.46, 0], [0.5, 0.04], [0.5, 0.6], [0.42, 0.72], [0.2, 0.82], [0.18, 0.92], [0.21, 0.94], [0.21, 1], [0, 1]]),
    sphere: new THREE.SphereGeometry(0.5, 16, 12),
  };
  const kinds = {
    tin: ['cyl', () => { const w = 0.15 + R() * 0.03; return [w, w * 1.25, w]; }],
    jar: ['cyl', () => { const w = 0.13 + R() * 0.03; return [w, w * 1.5, w]; }],
    tall: ['box', () => { const w = 0.2 + R() * 0.05; return [w, 0.34, 0.12]; }],
    bottle: ['bottle', () => { const w = 0.11 + R() * 0.04; return [w, w * 2.6, w]; }],
    roll: ['cyl', () => [0.17, 0.19, 0.17]],
    box: ['box', () => { const w = 0.18 + R() * 0.12; return [w, Math.min(0.33, w * (1.1 + R() * 0.5)), Math.min(0.2, w * 0.7)]; }],
    bigbox: ['box', () => { const w = 0.28 + R() * 0.12; return [w, 0.32, 0.22]; }],
    ball: ['sphere', () => { const w = 0.2 + R() * 0.06; return [w, w, w]; }],
    book: ['box', () => { const w = 0.035 + R() * 0.02; return [w, 0.26 + R() * 0.06, 0.2]; }],
    can: ['cyl', () => [0.1, 0.18, 0.1]],
    pack: ['box', () => [0.22, 0.28, 0.07]],
    card: ['box', () => [0.17, 0.24, 0.012]],
    bag: ['box', () => [0.24, 0.3, 0.1]],
  };
  const items = [];
  shops.forEach((sh) => {
    const rows = ROWS[sh.S.slug] || ROWS.poundshop; const pal = PAL_ROW[sh.S.slug] ?? 3;
    for (let r = 0; r < NR; r++) {
      const kind = rows[r]; const [geo, sz] = kinds[kind];
      const y0 = r === 0 ? 0.14 : shelfY(r) + 0.0125;
      let x = -SW / 2 + 0.08, k = 0;
      for (;;) {
        const [w, h, d] = sz(); if (x + w > SW / 2 - 0.07) break;
        if (Math.abs(x + w / 2) < 0.04) { x += 0.05; continue; }
        const tile = kind === 'roll' ? 56 : pal * 8 + ((k + r * 3) % 8);
        const deep = kind === 'card' || kind === 'book' || LOW ? 1 : 2;
        for (let dz = 0; dz < deep; dz++) items.push({ sh, geo, kind, lx: x + w / 2, ly: y0, lz: kind === 'card' ? 0.3 : 0.12 + dz * 0.17, w, h, d, tile, r, k, dz, tiltX: kind === 'card' ? -0.18 : 0 });
        x += w + (kind === 'book' ? 0.004 : kind === 'card' ? 0.035 : 0.014); k++;
      }
    }
  });
  const counts = {}; items.forEach((i) => (counts[i.geo] = (counts[i.geo] || 0) + 1));
  const inst = {};
  for (const t in counts) {
    const mat = new THREE.MeshStandardMaterial({ map: atlas, roughness: t === 'sphere' ? 0.25 : 0.42, metalness: t === 'cyl' ? 0.25 : 0, envMapIntensity: 1 });
    mat.onBeforeCompile = (sh) => { sh.vertexShader = 'attribute float aTile;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n vMapUv=(clamp(vMapUv,0.04,0.96)+vec2(mod(aTile,8.0),7.0-floor(aTile/8.0)))/8.0;'); };
    G[t].setAttribute('aTile', new THREE.InstancedBufferAttribute(new Float32Array(counts[t]), 1));
    const m = new THREE.InstancedMesh(G[t], mat, counts[t]); m.frustumCulled = false; m.castShadow = true; m.receiveShadow = true;
    ring.add(m); inst[t] = { m, i: 0 };
  }
  items.forEach((it) => { const I = inst[it.geo]; it.idx = I.i++; I.m.geometry.attributes.aTile.array[it.idx] = it.tile; });
  for (const t in inst) inst[t].m.geometry.attributes.aTile.needsUpdate = true;
  // drop timing: shops fill one after another, the front one first
  items.forEach((it) => { it.td = 0.35 + it.sh.i * 0.32 + it.r * 0.14 + (it.k / 16) * 0.25 + it.dz * 0.04; it.dur = 0.34; });
  const signT = (i) => 0.15 + i * 0.32;

  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), SC = new THREE.Vector3(), E = new THREE.Euler();
  let settled = false;
  function placeItems(t) {
    ring.updateMatrixWorld(true);
    let all = true;
    items.forEach((it) => {
      const k = reduced ? 1 : cl((t - it.td) / it.dur); const I = inst[it.geo].m;
      if (k < 1) all = false;
      if (k <= 0) { M.makeScale(0, 0, 0); I.setMatrixAt(it.idx, M); return; }
      const e = outB(k); const y = it.ly + (it.geo === 'bottle' ? 0 : it.h / 2) + (1 - e) * 0.7;
      const tilt = (1 - ease(k)) * 0.5 * (it.k % 2 ? 1 : -1);
      V.set(it.lx, y, it.lz); it.sh.g.localToWorld(V); ring.worldToLocal(V);
      E.set(it.tiltX + tilt * 0.2, it.sh.a + tilt * 0.3, tilt * 0.3); Q.setFromEuler(E);
      SC.set(it.w, it.h, it.d); M.compose(V, Q, SC); I.setMatrixAt(it.idx, M);
    });
    for (const k in inst) inst[k].m.instanceMatrix.needsUpdate = true;
    return all;
  }
  function setSigns(t) {
    shops.forEach((sh) => {
      const k = reduced ? 1 : cl((t - signT(sh.i)) / 0.6);
      sh.sign.visible = k > 0; sh.sign.position.y = UH + 0.42 + (1 - outB(k)) * 1.2;
    });
  }

  // interaction
  let spin = 0, vel = reduced ? 0 : -0.12, drag = false, lx = 0, downX = 0, downY = 0, lastMove = 0;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function hit(e) {
    const r = canvas.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(pickables, false)[0]; return h ? h.object.userData.slug : null;
  }
  const onDown = (e) => { drag = true; lx = downX = e.clientX; downY = e.clientY; canvas.style.cursor = 'grabbing'; };
  const onMove = (e) => {
    if (drag) { const dx = e.clientX - lx; lx = e.clientX; vel = (dx / Math.max(200, canvas.clientWidth)) * 3.2; spin += vel; lastMove = performance.now(); return; }
    if (e.pointerType === 'mouse') canvas.style.cursor = hit(e) ? 'pointer' : 'grab';
  };
  const onUp = (e) => {
    if (!drag) return; drag = false; canvas.style.cursor = 'grab';
    if (Math.hypot(e.clientX - downX, e.clientY - downY) < 7) { const s = hit(e); if (s) onPick(s); }
    if (performance.now() - lastMove > 80) vel = 0;
  };
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);

  function resize() {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    // fit the ring: wider shots on narrow hosts
    const fitW = AP * 2 + 1.7, fitH = UH + 2.4;
    const vf = (camera.fov * Math.PI) / 180;
    const d = Math.max(fitH / 2 / Math.tan(vf / 2), fitW / 2 / (Math.tan(vf / 2) * camera.aspect)) * 0.98;
    camera.position.set(0, d * 0.27, d);
    camera.lookAt(0, 1.3, 0);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(host); resize();

  let visible = true;
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }, { threshold: 0 });
  io.observe(host);

  const t0 = performance.now(); let last = t0, raf = 0;
  function frame(now) {
    if (!visible || document.hidden) { raf = 0; return; }
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;
    if (!drag && !reduced) { const target = -0.18; vel += (target * dt - vel) * Math.min(1, dt * 1.5); spin += vel; }
    else if (!drag) { vel *= 0.92; spin += vel; }
    ring.rotation.y = spin;
    if (!settled) { setSigns(t); settled = placeItems(t) && t > 3.5; }
    renderer.render(scene, camera);
  }
  const onVis = () => { if (!document.hidden && visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  document.addEventListener('visibilitychange', onVis);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp);
    renderer.dispose(); canvas.remove();
  };
}
