export const models = [
  {
    name: "chamber1",
    data: [
      { name: "Geochelone carbonaria", path: "../models/c1/geochelone/USNM_222486-100k-2048.gltf", mesh: null, box: null, scale: 1, position: { x: 3, y: 1, z: -3 }, rotation: { x: 0, y: -Math.PI / 4, z: 0 }, offset: { x: 0, y: 1, z: 0 }, theta: Math.PI / 2, stare_dist: 1.5 },
      {
        name: "Eremotherium laurillardi",
        path: "../models/c1/eremotherium/eremotherium_laurillardi-150k-4096.gltf",
        mesh: null,
        box: null,
        scale: 0.001,
        position: { x: 3, y: 1, z: 3 },
        rotation: { x: 0, y: (Math.PI * 5) / 4, z: 0 },
        offset: { x: 0, y: 0, z: 0 },
        theta: Math.PI * 3,
        stare_dist: 3,
      },
      { name: "Mammuthus primigenius (Blumbach)", path: "../models/c1/mammoth/woolly-mammoth-100k-4096.gltf", mesh: null, box: null, scale: 1, position: { x: -3, y: 2, z: 3 }, rotation: { x: 0, y: (Math.PI * 5) / 4, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: -Math.PI / 4, stare_dist: 3 },
      {
        name: "Triceratops horridus",
        path: "../models/c1/tricera/Triceratops_horridus_Marsh_1889-150k-4096.gltf",
        mesh: null,
        box: null,
        scale: 1,
        position: { x: -3, y: 2, z: -3.5 },
        rotation: { x: -Math.PI / 8, y: -Math.PI / 4, z: Math.PI / 4 },
        offset: { x: 0, y: 0.7, z: 0 },
        theta: Math.PI / 4,
        stare_dist: 3,
      },
    ],
    soundsFiles: [
      { name: "Geochelone carbonaria", path: "../Background-Sounds/Chamber1/Object1.mp3", position: { x: 6, y: 0, z: -6 }, volume: 0 },
      { name: "Eremotherium laurillardi", path: "../Background-Sounds/Chamber1/Object2.mp3", position: { x: 6, y: 0, z: 6 }, volume: 0 },
      { name: "Mammuthus primigenius (Blumbach)", path: "../Background-Sounds/Chamber1/Object3.mp3", position: { x: -6, y: 0, z: 6 }, volume: 0 },
      { name: "Triceratops horridus", path: "../Background-Sounds/Chamber1/Object4.mp3", position: { x: -6, y: 0, z: -6 }, volume: 0 },
    ],
  },
  {
    name: "chamber2",
    data: [
      { name: "Beaker-shaped vase ", path: "../models/c2/vase1/f1980_193-150k-4096.gltf", mesh: null, box: null, scale: 1, position: { x: 2, y: 0.5, z: -21 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: 0.1, z: 0 }, theta: Math.PI / 2, stare_dist: 1 },
      { name: "Baluster vase", path: "../models/c2/vase2/baluster_vase-150k-4096.gltf", mesh: null, box: null, scale: 1, position: { x: 2, y: 0.5, z: -18 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: Math.PI * 3, stare_dist: 1 },
      { name: "ewer", path: "../models/c2/ewer/lidded_ewer-150k-4096.gltf", mesh: null, box: null, scale: 5, position: { x: -2, y: 1, z: -18 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: -Math.PI / 4, stare_dist: 1.5 },
      { name: "fangyi", path: "../models/c2/fangyi/fangyi-150k-4096.gltf", mesh: null, box: null, scale: 0.005, position: { x: -2, y: 1, z: -21 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: Math.PI / 4, stare_dist: 2 },
    ],
    soundsFiles: [],
  },
  {
    name: "chamber3",
    data: [
      { name: "1903 Wright Flyer", path: "../models/c3/wright/wright_flyer-full_resolution.gltf", mesh: null, box: null, scale: 0.0005, position: { x: 3, y: 1, z: -36 }, rotation: { x: 0, y: (Math.PI * 5) / 4, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: Math.PI * 3, stare_dist: 4 },
      { name: "Bell X-1", path: "../models/c3/bell/bell_x1_mesh-web_remap.gltf", mesh: null, box: null, scale: 0.0005, position: { x: -3, y: 1, z: -43 }, rotation: { x: 0, y: (Math.PI * 5) / 4, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: Math.PI / 4, stare_dist: 3 },
    ],
    soundsFiles: [],
  },
  {
    name: "chamber4",
    data: [
      { name: "armstrong", path: "../models/c4/armstrong/armstrong.gltf", mesh: null, box: null, scale: 0.1, position: { x: 3, y: 1.5, z: -95 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: -0.8, z: 0 }, theta: Math.PI / 2, stare_dist: 1.5 },
      { name: "Apollo", path: "../models/c4/apollo/apollo_exterior-150k-4096.gltf", mesh: null, box: null, scale: 0.01, position: { x: 5, y: 2, z: -85 }, rotation: { x: 0, y: Math.PI, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: Math.PI * 3, stare_dist: 3.5 },
      { name: "shuttle", path: "../models/c4/space/Orbiter_Space_Shuttle_OV-103_Discovery-150k-4096.gltf", mesh: null, box: null, scale: 1, position: { x: -20, y: 2, z: -90 }, rotation: { x: 0, y: 0, z: 0 }, offset: { x: 0, y: 0, z: 0 }, theta: 0, stare_dist: 13 },
    ],
    soundsFiles: [],
  },
  {
    name: "rooms",
    data: [
      { name: "chamber1-room", path: "../models/rooms/chamber1/chamber1.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: 0 } },
      { name: "chamber2-room", path: "../models/rooms/chamber2/chamber2.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -19.3 } },
      { name: "chamber3-room", path: "../models/rooms/chamber3/chamber3.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -38.6 } },
      { name: "chamber4-room", path: "../models/rooms/chamber4/chamber4.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -90 } },
    ],
  },
];
