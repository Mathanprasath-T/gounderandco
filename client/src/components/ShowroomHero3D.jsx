/**
 * ShowroomHero3D.jsx
 * 
 * Immersive scroll-controlled 3D showroom hero using Three.js + GSAP ScrollTrigger.
 * Camera travels through a procedurally built furniture showroom as the user scrolls.
 * 
 * Scenes:
 *   1. Entrance — wide cinematic view of the showroom
 *   2. Living room — sofas, coffee table, rug
 *   3. Bedroom — wooden cot, wardrobe, dressing table
 *   4. Electronics — TVs, refrigerator, washing machine
 *   5. Final reveal — wide pull-back
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../data/businessInfo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Colour palette ─────────────────────────── */
const C = {
  sage:     0x718C56,
  walnut:   0x4F3426,
  amber:    0xCA6B14,
  ivory:    0xF3EBDD,
  beige:    0xE8DDCC,
  charcoal: 0x292722,
  white:    0xFFFFFF,
  floor:    0xC4A87C,   // warm oak
  ceil:     0xE8DCC8,   // off-white ceiling
  wall:     0xEDE4D4,   // warm ivory wall
  wallAcc:  0xD8CCBA,   // accent panel
};

/* ────────────── Helpers: procedural furniture builders ────────────── */

function makeMaterial(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.7,
    metalness: opts.metalness ?? 0.05,
    ...opts,
  });
}

function box(w, h, d, mat) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildFloor(width, depth) {
  const geo = new THREE.PlaneGeometry(width, depth);
  const mat = makeMaterial(C.floor, { roughness: 0.5 });
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  return floor;
}

function buildCeiling(width, depth, height) {
  const geo = new THREE.PlaneGeometry(width, depth);
  const mat = makeMaterial(C.ceil, { roughness: 0.9 });
  const ceil = new THREE.Mesh(geo, mat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = height;
  return ceil;
}

function buildWall(width, height, pos, rotY = 0, color = C.wall) {
  const geo = new THREE.PlaneGeometry(width, height);
  const mat = makeMaterial(color, { roughness: 0.85, side: THREE.DoubleSide });
  const wall = new THREE.Mesh(geo, mat);
  wall.position.set(pos.x, pos.y, pos.z);
  wall.rotation.y = rotY;
  wall.receiveShadow = true;
  return wall;
}

/* ─── Sofa ─── */
function buildSofa(options = {}) {
  const { color = C.sage, width = 3.2, depth = 1.1, seatH = 0.5 } = options;
  const g = new THREE.Group();
  const fab = makeMaterial(color, { roughness: 0.8 });
  const leg = makeMaterial(C.walnut, { roughness: 0.4 });

  // seat
  const seat = box(width, seatH * 0.6, depth, fab);
  seat.position.y = seatH;
  g.add(seat);

  // back
  const back = box(width, seatH * 0.85, 0.22, fab);
  back.position.set(0, seatH + seatH * 0.35, -depth / 2 + 0.11);
  g.add(back);

  // arms
  for (const side of [-1, 1]) {
    const arm = box(0.2, seatH * 0.6, depth * 0.9, fab);
    arm.position.set(side * (width / 2 - 0.1), seatH + 0.05, 0);
    g.add(arm);
  }

  // cushions
  const cushW = (width - 0.5) / 3;
  for (let i = -1; i <= 1; i++) {
    const cushion = box(cushW * 0.92, 0.12, depth * 0.72, makeMaterial(color === C.sage ? 0x8BA06A : color, { roughness: 0.85 }));
    cushion.position.set(i * cushW, seatH + 0.36, 0.06);
    g.add(cushion);
  }

  // legs
  const positions = [
    [-width / 2 + 0.15, 0.1, depth / 2 - 0.15],
    [width / 2 - 0.15, 0.1, depth / 2 - 0.15],
    [-width / 2 + 0.15, 0.1, -depth / 2 + 0.15],
    [width / 2 - 0.15, 0.1, -depth / 2 + 0.15],
  ];
  positions.forEach(([x, y, z]) => {
    const l = box(0.08, 0.2, 0.08, leg);
    l.position.set(x, y, z);
    g.add(l);
  });

  return g;
}

/* ─── Coffee table ─── */
function buildCoffeeTable() {
  const g = new THREE.Group();
  const wood = makeMaterial(0x8B5A28, { roughness: 0.4 });
  const top = box(1.4, 0.06, 0.7, wood);
  top.position.y = 0.45;
  g.add(top);

  for (const [x, z] of [[-0.55, 0.25], [0.55, 0.25], [-0.55, -0.25], [0.55, -0.25]]) {
    const leg = box(0.06, 0.42, 0.06, wood);
    leg.position.set(x, 0.21, z);
    g.add(leg);
  }

  // shelf
  const shelf = box(1.2, 0.04, 0.55, makeMaterial(0x7A4A20, { roughness: 0.5 }));
  shelf.position.y = 0.18;
  g.add(shelf);

  return g;
}

/* ─── Wooden bed ─── */
function buildBed() {
  const g = new THREE.Group();
  const wood = makeMaterial(0x7A4820, { roughness: 0.45 });
  const fabric = makeMaterial(C.ivory, { roughness: 0.9 });

  // frame
  const frame = box(2.2, 0.15, 3, wood);
  frame.position.y = 0.35;
  g.add(frame);

  // headboard
  const hb = box(2.2, 1.3, 0.12, wood);
  hb.position.set(0, 1.0, -1.44);
  g.add(hb);

  // mattress
  const matt = box(2.0, 0.25, 2.6, fabric);
  matt.position.set(0, 0.55, 0.1);
  g.add(matt);

  // pillows
  for (const x of [-0.55, 0.55]) {
    const p = box(0.6, 0.12, 0.35, makeMaterial(C.beige, { roughness: 0.9 }));
    p.position.set(x, 0.72, -1.05);
    g.add(p);
  }

  // legs
  for (const [x, z] of [[-1.0, 1.35], [1.0, 1.35], [-1.0, -1.35], [1.0, -1.35]]) {
    const l = box(0.1, 0.27, 0.1, wood);
    l.position.set(x, 0.135, z);
    g.add(l);
  }

  return g;
}

/* ─── Wardrobe ─── */
function buildWardrobe() {
  const g = new THREE.Group();
  const wood = makeMaterial(0x6B3E18, { roughness: 0.5 });
  const panel = makeMaterial(0x7A4E28, { roughness: 0.55 });

  // body
  const body = box(1.8, 2.3, 0.65, wood);
  body.position.y = 1.15;
  g.add(body);

  // door panels
  for (const x of [-0.42, 0.42]) {
    const door = box(0.82, 2.1, 0.04, panel);
    door.position.set(x, 1.15, 0.34);
    g.add(door);
  }

  // handles
  const handleMat = makeMaterial(0xC8A030, { roughness: 0.3, metalness: 0.6 });
  for (const x of [-0.06, 0.06]) {
    const h = box(0.04, 0.2, 0.04, handleMat);
    h.position.set(x, 1.15, 0.38);
    g.add(h);
  }

  // crown molding
  const crown = box(1.9, 0.08, 0.72, wood);
  crown.position.y = 2.34;
  g.add(crown);

  return g;
}

/* ─── Dining table with chairs ─── */
function buildDiningSet() {
  const g = new THREE.Group();
  const wood = makeMaterial(0x8B5828, { roughness: 0.45 });
  const chairFab = makeMaterial(C.sage, { roughness: 0.8 });

  // table top
  const top = box(2.4, 0.08, 1.2, wood);
  top.position.y = 0.78;
  g.add(top);

  // legs
  for (const [x, z] of [[-1.0, 0.45], [1.0, 0.45], [-1.0, -0.45], [1.0, -0.45]]) {
    const l = box(0.08, 0.74, 0.08, wood);
    l.position.set(x, 0.37, z);
    g.add(l);
  }

  // chairs
  const chairPositions = [
    { x: -0.7, z: 0.85, ry: 0 },
    { x: 0.7, z: 0.85, ry: 0 },
    { x: -0.7, z: -0.85, ry: Math.PI },
    { x: 0.7, z: -0.85, ry: Math.PI },
    { x: -1.45, z: 0, ry: Math.PI / 2 },
    { x: 1.45, z: 0, ry: -Math.PI / 2 },
  ];

  chairPositions.forEach(({ x, z, ry }) => {
    const chair = new THREE.Group();
    // seat
    const seat = box(0.45, 0.06, 0.45, wood);
    seat.position.y = 0.48;
    chair.add(seat);
    // back
    const back = box(0.42, 0.55, 0.05, chairFab);
    back.position.set(0, 0.78, -0.2);
    chair.add(back);
    // legs
    for (const [lx, lz] of [[-0.18, 0.18], [0.18, 0.18], [-0.18, -0.18], [0.18, -0.18]]) {
      const leg = box(0.04, 0.45, 0.04, wood);
      leg.position.set(lx, 0.225, lz);
      chair.add(leg);
    }
    chair.position.set(x, 0, z);
    chair.rotation.y = ry;
    g.add(chair);
  });

  return g;
}

/* ─── TV on console ─── */
function buildTVDisplay() {
  const g = new THREE.Group();
  const dark = makeMaterial(0x1A1A1A, { roughness: 0.3, metalness: 0.4 });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0A2A4A,
    roughness: 0.1,
    metalness: 0.3,
    emissive: 0x1A4A7A,
    emissiveIntensity: 0.3,
  });

  // console
  const console_ = box(2.0, 0.4, 0.5, makeMaterial(C.walnut, { roughness: 0.45 }));
  console_.position.y = 0.2;
  g.add(console_);

  // TV body
  const tv = box(2.4, 1.4, 0.06, dark);
  tv.position.set(0, 1.3, 0);
  g.add(tv);

  // screen
  const screen = box(2.3, 1.3, 0.02, screenMat);
  screen.position.set(0, 1.3, 0.04);
  g.add(screen);

  // stand
  const stand = box(0.5, 0.08, 0.3, dark);
  stand.position.set(0, 0.44, 0);
  g.add(stand);

  return g;
}

/* ─── Refrigerator ─── */
function buildRefrigerator() {
  const g = new THREE.Group();
  const metal = makeMaterial(0xD0D0D0, { roughness: 0.2, metalness: 0.5 });
  const handle = makeMaterial(0x888888, { roughness: 0.2, metalness: 0.7 });

  const body = box(0.85, 1.95, 0.7, metal);
  body.position.y = 0.975;
  g.add(body);

  // door seam
  const seam = box(0.82, 0.02, 0.04, makeMaterial(0x999999, { metalness: 0.5 }));
  seam.position.set(0, 1.3, 0.37);
  g.add(seam);

  // handles
  for (const y of [1.6, 0.8]) {
    const h = box(0.04, 0.3, 0.06, handle);
    h.position.set(0.35, y, 0.38);
    g.add(h);
  }

  return g;
}

/* ─── Washing machine ─── */
function buildWashingMachine() {
  const g = new THREE.Group();
  const body = makeMaterial(0xE8E8E8, { roughness: 0.25, metalness: 0.3 });

  const main = box(0.65, 0.9, 0.65, body);
  main.position.y = 0.45;
  g.add(main);

  // drum door (front circle representation)
  const drumGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 24);
  const drumMat = makeMaterial(0x555555, { roughness: 0.1, metalness: 0.6 });
  const drum = new THREE.Mesh(drumGeo, drumMat);
  drum.rotation.x = Math.PI / 2;
  drum.position.set(0, 0.5, 0.34);
  g.add(drum);

  // control panel
  const panel = box(0.6, 0.1, 0.04, makeMaterial(0x333333, { metalness: 0.4 }));
  panel.position.set(0, 0.88, 0.34);
  g.add(panel);

  return g;
}

/* ─── Indoor plant ─── */
function buildPlant(tall = false) {
  const g = new THREE.Group();
  const pot = makeMaterial(0x8B5A28, { roughness: 0.6 });
  const leaf = makeMaterial(0x5A7A44, { roughness: 0.8 });

  const potH = tall ? 0.45 : 0.3;
  const potW = tall ? 0.3 : 0.22;
  const potMesh = box(potW, potH, potW, pot);
  potMesh.position.y = potH / 2;
  g.add(potMesh);

  const leafCount = tall ? 5 : 3;
  for (let i = 0; i < leafCount; i++) {
    const s = 0.15 + Math.random() * 0.2;
    const geo = new THREE.SphereGeometry(s, 8, 6);
    const l = new THREE.Mesh(geo, leaf);
    l.position.set(
      (Math.random() - 0.5) * 0.25,
      potH + 0.1 + i * (tall ? 0.18 : 0.12),
      (Math.random() - 0.5) * 0.25
    );
    l.scale.y = 0.8 + Math.random() * 0.4;
    g.add(l);
  }

  return g;
}

/* ─── Rug (flat box) ─── */
function buildRug(w, d, color = 0xC8A060) {
  const mat = makeMaterial(color, { roughness: 0.9 });
  const rug = box(w, 0.02, d, mat);
  rug.position.y = 0.01;
  rug.receiveShadow = true;
  return rug;
}

/* ─── Pendant / ceiling light ─── */
function buildPendantLight(y = 3.8) {
  const g = new THREE.Group();
  const rod = box(0.02, 0.6, 0.02, makeMaterial(0xA07838, { metalness: 0.5 }));
  rod.position.y = y;
  g.add(rod);

  const shadeGeo = new THREE.ConeGeometry(0.25, 0.3, 16, 1, true);
  const shade = new THREE.Mesh(shadeGeo, makeMaterial(C.ivory, { roughness: 0.8, side: THREE.DoubleSide }));
  shade.rotation.x = Math.PI;
  shade.position.y = y - 0.45;
  g.add(shade);

  const light = new THREE.PointLight(0xFFE0A0, 1.5, 8, 1.5);
  light.position.y = y - 0.5;
  light.castShadow = true;
  light.shadow.mapSize.set(512, 512);
  g.add(light);

  return g;
}

/* ─── Dressing table ─── */
function buildDressingTable() {
  const g = new THREE.Group();
  const wood = makeMaterial(0x7A4E28, { roughness: 0.5 });
  const mirror = makeMaterial(0xC8E0F0, { roughness: 0.05, metalness: 0.6 });

  // table
  const top = box(1.2, 0.05, 0.5, wood);
  top.position.y = 0.78;
  g.add(top);

  // legs
  for (const x of [-0.5, 0.5]) {
    const leg = box(0.08, 0.75, 0.45, wood);
    leg.position.set(x, 0.375, 0);
    g.add(leg);
  }

  // mirror
  const m = box(0.9, 1.0, 0.04, mirror);
  m.position.set(0, 1.5, -0.22);
  g.add(m);

  // mirror frame
  const frame = makeMaterial(0x6A3A18, { roughness: 0.5 });
  const ft = box(0.96, 0.04, 0.06, frame); ft.position.set(0, 2.02, -0.22); g.add(ft);
  const fb = box(0.96, 0.04, 0.06, frame); fb.position.set(0, 0.98, -0.22); g.add(fb);
  const fl = box(0.04, 1.08, 0.06, frame); fl.position.set(-0.48, 1.5, -0.22); g.add(fl);
  const fr = box(0.04, 1.08, 0.06, frame); fr.position.set(0.48, 1.5, -0.22); g.add(fr);

  return g;
}

/* ─── Shelf unit with items ─── */
function buildShelfUnit() {
  const g = new THREE.Group();
  const wood = makeMaterial(C.walnut, { roughness: 0.5 });

  // sides
  for (const x of [-0.5, 0.5]) {
    const side = box(0.06, 2.0, 0.4, wood);
    side.position.set(x, 1.0, 0);
    g.add(side);
  }

  // shelves
  for (let i = 0; i < 5; i++) {
    const sh = box(1.06, 0.04, 0.4, wood);
    sh.position.y = i * 0.48 + 0.04;
    g.add(sh);
  }

  // decorative items on shelves
  const itemMat = makeMaterial(C.amber, { roughness: 0.6 });
  for (let i = 1; i < 4; i++) {
    const item = box(0.15, 0.2, 0.12, itemMat);
    item.position.set(-0.2 + i * 0.18, i * 0.48 + 0.14, 0);
    g.add(item);
  }

  return g;
}


/* ═══════════════════════════════════════════════════════════════════════
   Camera path — CatmullRomCurve3 waypoints through the showroom
   The showroom extends along -Z (camera enters and moves deeper)
   ═══════════════════════════════════════════════════════════════════════ */
function createCameraPath() {
  const points = [
    // Scene 1: Entrance — wide exterior establishing shot
    new THREE.Vector3(0, 2.5, 12),
    new THREE.Vector3(0, 2.2, 9),

    // Scene 2: Living room — sofas and coffee table
    new THREE.Vector3(-1.5, 1.8, 5),
    new THREE.Vector3(-0.5, 1.6, 2),

    // Scene 3: Dining area
    new THREE.Vector3(1.5, 1.8, -1),
    new THREE.Vector3(0.5, 1.7, -4),

    // Scene 4: Bedroom
    new THREE.Vector3(-1.2, 1.6, -7),
    new THREE.Vector3(0, 1.8, -10),

    // Scene 5: Electronics
    new THREE.Vector3(1.0, 1.7, -13),
    new THREE.Vector3(0, 1.9, -16),

    // Scene 6: Final pullback — wide reveal
    new THREE.Vector3(0, 2.8, -18),
  ];

  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
}

/* Look-at targets matching the camera path progress */
function createLookAtPath() {
  const points = [
    new THREE.Vector3(0, 1.5, 6),
    new THREE.Vector3(0, 1.2, 3),
    new THREE.Vector3(-1.0, 1.0, 1),
    new THREE.Vector3(0, 1.0, -2),
    new THREE.Vector3(1.0, 1.0, -4),
    new THREE.Vector3(0, 1.0, -7),
    new THREE.Vector3(-0.8, 1.2, -10),
    new THREE.Vector3(0, 1.0, -13),
    new THREE.Vector3(0.5, 1.2, -16),
    new THREE.Vector3(0, 1.5, -20),
    new THREE.Vector3(0, 1.5, -22),
  ];
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
}


/* ═══════════════════════════════════════════════════════════════════════
   Scene builder — assemble the full showroom
   ═══════════════════════════════════════════════════════════════════════ */
function buildShowroomScene(scene) {
  const ROOM_W = 14;
  const ROOM_D = 36;
  const ROOM_H = 4.2;

  // ── Floor + Ceiling ──
  const floor = buildFloor(ROOM_W, ROOM_D);
  floor.position.z = -ROOM_D / 2 + 12;
  scene.add(floor);

  const ceil = buildCeiling(ROOM_W, ROOM_D, ROOM_H);
  ceil.position.z = -ROOM_D / 2 + 12;
  scene.add(ceil);

  // ── Walls ──
  // back wall
  scene.add(buildWall(ROOM_W, ROOM_H, { x: 0, y: ROOM_H / 2, z: -ROOM_D + 12 }, 0, C.wallAcc));

  // left wall
  scene.add(buildWall(ROOM_D, ROOM_H, { x: -ROOM_W / 2, y: ROOM_H / 2, z: -ROOM_D / 2 + 12 }, Math.PI / 2));

  // right wall
  scene.add(buildWall(ROOM_D, ROOM_H, { x: ROOM_W / 2, y: ROOM_H / 2, z: -ROOM_D / 2 + 12 }, -Math.PI / 2));

  // front wall (with opening)
  const frontWallL = buildWall(4, ROOM_H, { x: -5, y: ROOM_H / 2, z: 12 }, Math.PI);
  const frontWallR = buildWall(4, ROOM_H, { x: 5, y: ROOM_H / 2, z: 12 }, Math.PI);
  const frontWallTop = buildWall(6, 1.5, { x: 0, y: ROOM_H - 0.75, z: 12 }, Math.PI);
  scene.add(frontWallL, frontWallR, frontWallTop);

  // ── Section divider walls (half-height) ──
  // between living and dining
  const div1 = buildWall(3, 2.5, { x: -5, y: 1.25, z: 0.5 }, 0, C.wallAcc);
  scene.add(div1);

  // between dining and bedroom
  const div2 = buildWall(4, 3, { x: 4, y: 1.5, z: -5 }, Math.PI / 2, C.wallAcc);
  scene.add(div2);

  // ══════════════════ SCENE 2: LIVING ROOM (z ≈ 0 to 6) ══════════════════
  const sofa = buildSofa({ color: C.sage, width: 3.4 });
  sofa.position.set(-2.5, 0, 3);
  sofa.rotation.y = Math.PI / 4 * 0.15;
  scene.add(sofa);

  // second smaller sofa
  const sofa2 = buildSofa({ color: 0x9B8A6A, width: 2.0, depth: 0.9 });
  sofa2.position.set(2.5, 0, 4.5);
  sofa2.rotation.y = -Math.PI / 2;
  scene.add(sofa2);

  const coffeeTable = buildCoffeeTable();
  coffeeTable.position.set(-0.5, 0, 3.5);
  scene.add(coffeeTable);

  const rug1 = buildRug(4.5, 3.5, 0xC8A060);
  rug1.position.set(-0.5, 0, 3.5);
  scene.add(rug1);

  const plant1 = buildPlant(true);
  plant1.position.set(-5.5, 0, 5);
  scene.add(plant1);

  const plant2 = buildPlant();
  plant2.position.set(5.5, 0, 3);
  scene.add(plant2);

  scene.add(buildPendantLight(ROOM_H));
  const pendant2 = buildPendantLight(ROOM_H);
  pendant2.position.x = -2.5;
  pendant2.position.z = 3;
  scene.add(pendant2);

  // shelf against left wall
  const shelf1 = buildShelfUnit();
  shelf1.position.set(-6.5, 0, 1);
  shelf1.rotation.y = Math.PI / 2;
  scene.add(shelf1);

  // ══════════════════ SCENE 3: DINING AREA (z ≈ -1 to -4) ══════════════════
  const dining = buildDiningSet();
  dining.position.set(1.5, 0, -2.5);
  scene.add(dining);

  const rug2 = buildRug(3.5, 2.5, 0xD8B080);
  rug2.position.set(1.5, 0, -2.5);
  scene.add(rug2);

  const diningLight = buildPendantLight(ROOM_H);
  diningLight.position.set(1.5, 0, -2.5);
  scene.add(diningLight);

  const plant3 = buildPlant(true);
  plant3.position.set(-3, 0, -3);
  scene.add(plant3);

  // ══════════════════ SCENE 4: BEDROOM (z ≈ -6 to -11) ══════════════════
  const bed = buildBed();
  bed.position.set(-2, 0, -8);
  bed.rotation.y = Math.PI / 6 * 0.3;
  scene.add(bed);

  const wardrobe = buildWardrobe();
  wardrobe.position.set(-6, 0, -9);
  wardrobe.rotation.y = Math.PI / 2;
  scene.add(wardrobe);

  const dressingTable = buildDressingTable();
  dressingTable.position.set(3, 0, -7.5);
  dressingTable.rotation.y = -Math.PI / 6;
  scene.add(dressingTable);

  const rug3 = buildRug(4, 3.5, 0xBB9070);
  rug3.position.set(-1.5, 0, -8);
  scene.add(rug3);

  const bedroomLight = buildPendantLight(ROOM_H);
  bedroomLight.position.set(-2, 0, -8);
  scene.add(bedroomLight);

  const plant4 = buildPlant();
  plant4.position.set(5.5, 0, -9);
  scene.add(plant4);

  // ══════════════════ SCENE 5: ELECTRONICS (z ≈ -12 to -18) ══════════════════
  const tvDisplay = buildTVDisplay();
  tvDisplay.position.set(0, 0, -14);
  scene.add(tvDisplay);

  const fridge = buildRefrigerator();
  fridge.position.set(-4, 0, -15);
  scene.add(fridge);

  const fridge2 = buildRefrigerator();
  fridge2.position.set(-5.5, 0, -15);
  scene.add(fridge2);

  const washer = buildWashingMachine();
  washer.position.set(4, 0, -15);
  scene.add(washer);

  const washer2 = buildWashingMachine();
  washer2.position.set(5.5, 0, -15);
  scene.add(washer2);

  // second TV
  const tv2 = buildTVDisplay();
  tv2.position.set(-2, 0, -17);
  tv2.rotation.y = Math.PI / 6;
  scene.add(tv2);

  const shelf2 = buildShelfUnit();
  shelf2.position.set(6, 0, -17);
  shelf2.rotation.y = -Math.PI / 2;
  scene.add(shelf2);

  const electronicsLight = buildPendantLight(ROOM_H);
  electronicsLight.position.set(0, 0, -14);
  scene.add(electronicsLight);

  const electronicsLight2 = buildPendantLight(ROOM_H);
  electronicsLight2.position.set(0, 0, -17);
  scene.add(electronicsLight2);

  const plant5 = buildPlant(true);
  plant5.position.set(-6, 0, -13);
  scene.add(plant5);

  // ══════════════════ GLOBAL LIGHTING ══════════════════
  // warm ambient
  const ambient = new THREE.AmbientLight(0xFFE8D0, 0.45);
  scene.add(ambient);

  // main directional light (warm sunlight from entrance)
  const sun = new THREE.DirectionalLight(0xFFE0B0, 1.2);
  sun.position.set(3, 8, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 50;
  sun.shadow.camera.left = -15;
  sun.shadow.camera.right = 15;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -10;
  scene.add(sun);

  // fill light from the back
  const fill = new THREE.DirectionalLight(0xE0D0C0, 0.4);
  fill.position.set(-5, 6, -20);
  scene.add(fill);

  // hemisphere light for natural feel
  const hemi = new THREE.HemisphereLight(0xF3EBDD, 0x8B6B40, 0.35);
  scene.add(hemi);

  // fog for depth
  scene.fog = new THREE.FogExp2(0xEDE4D4, 0.018);
  scene.background = new THREE.Color(0xEDE4D4);
}


/* ═══════════════════════════════════════════════════════════════════════
   REACT COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function ShowroomHero3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // mouse for parallax
  const mouseRef = useRef({ x: 0, y: 0 });

  const scrollToCategories = useCallback(() => {
    document.getElementById('product-categories')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    /* ───── Three.js setup ───── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2.5, 12);

    /* ───── Build showroom ───── */
    buildShowroomScene(scene);

    /* ───── Camera paths ───── */
    const cameraPath = createCameraPath();
    const lookAtPath = createLookAtPath();

    // initial render
    const tempTarget = lookAtPath.getPoint(0);
    camera.lookAt(tempTarget);
    renderer.render(scene, camera);

    /* ───── Animation state ───── */
    let currentProgress = 0;
    let targetProgress = 0;
    let animFrameId;
    const parallaxOffset = { x: 0, y: 0 };

    /* ───── Mouse parallax ───── */
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    /* ───── GSAP ScrollTrigger ───── */
    let gsapCtx;
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            targetProgress = self.progress;

            // fade content overlay
            if (contentRef.current) {
              const contentOpacity = Math.max(0, 1 - self.progress * 2.5);
              const contentTranslateY = self.progress * -60;
              contentRef.current.style.opacity = contentOpacity.toString();
              contentRef.current.style.transform = `translateY(${contentTranslateY}px)`;
              contentRef.current.style.pointerEvents = contentOpacity < 0.15 ? 'none' : 'auto';
            }
          },
        });
      }, container);
    }

    /* ───── Render loop ───── */
    const render = () => {
      animFrameId = requestAnimationFrame(render);

      // smoothly interpolate progress
      currentProgress += (targetProgress - currentProgress) * 0.06;

      // camera on path
      const pos = cameraPath.getPoint(currentProgress);
      const lookTarget = lookAtPath.getPoint(currentProgress);

      // add subtle mouse parallax
      parallaxOffset.x += (mouseRef.current.x * 0.15 - parallaxOffset.x) * 0.04;
      parallaxOffset.y += (mouseRef.current.y * 0.08 - parallaxOffset.y) * 0.04;

      camera.position.set(
        pos.x + parallaxOffset.x,
        pos.y + parallaxOffset.y * 0.3,
        pos.z
      );
      camera.lookAt(
        lookTarget.x + parallaxOffset.x * 0.3,
        lookTarget.y,
        lookTarget.z
      );

      renderer.render(scene, camera);
    };
    render();

    /* ───── Resize ───── */
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize, { passive: true });

    /* ───── Cleanup ───── */
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      gsapCtx?.revert();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#EDE4D4] select-none"
      aria-label="Immersive 3D Showroom Experience"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ display: 'block' }}
      />

      {/* Dark vignette overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(41,39,34,0.35) 100%),
            linear-gradient(to bottom, rgba(41,39,34,0.15) 0%, transparent 35%, transparent 55%, rgba(41,39,34,0.55) 100%)
          `,
        }}
      />

      {/* Editorial Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Trust Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-walnut/60 backdrop-blur-md border border-ivory/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{BUSINESS_INFO.trustBadge}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl text-balance"
          style={{ textShadow: '0 4px 30px rgba(41,39,34,0.7), 0 2px 8px rgba(0,0,0,0.4)' }}
        >
          {BUSINESS_INFO.tagline}
        </h1>

        {/* Supporting Description */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-ivory/95 max-w-2xl font-light leading-relaxed text-balance"
          style={{ textShadow: '0 2px 12px rgba(41,39,34,0.6)' }}
        >
          {BUSINESS_INFO.supportingText}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={scrollToCategories}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-base shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
          >
            <span>Explore Collections</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ivory/20 hover:bg-ivory/30 backdrop-blur-md text-white border border-ivory/40 font-medium text-base transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ivory/80 text-xs tracking-wider uppercase font-medium">
          <span style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>Scroll to explore showroom</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
        </div>
      </div>
    </section>
  );
}

