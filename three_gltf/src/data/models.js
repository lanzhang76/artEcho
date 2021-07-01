export const models = [
  {
    name: "Gallery 1: Prehistoric Creatures",
    data: [
      {
        name: "Woolly mammoths",
        path: "../models/c1/mammoth/woolly-mammoth-100k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 5, offset: 1 },
        scale: 1,
        position: { x: 4, y: 1, z: -5 },
        rotation: { x: 0, y: 2 * Math.PI - Math.PI / 2, z: 0 },
        offset: { x: 0, y: 0.1, z: 0 },
        theta: Math.PI / 2,
        stare_dist: 3,
        footstep: 5,
      },
      {
        name: "Triceratops horridus",
        path: "../models/c1/tricera/Triceratops_horridus_Marsh_1889-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 7, distance: 5, offset: 2 },
        scale: 1,
        position: { x: 4, y: 1, z: 4 },
        rotation: { x: (24 * Math.PI) / 180, y: -Math.PI, z: Math.PI / 2 - 0.4 },
        offset: { x: 0, y: 0.7, z: 0 },
        theta: Math.PI * 3,
        stare_dist: 3.5,
        footstep: 3,
      },
      {
        name: "Red-footed Tortoise",
        path: "../models/c1/geochelone/USNM_222486-100k-2048.gltf",
        mesh: null,
        box: null,
        light: { intensity: 7, distance: 3, offset: 2 },
        scale: 1,
        position: { x: -4, y: 1, z: 4 },
        rotation: { x: 0, y: Math.PI / 4 + (20 * Math.PI) / 180, z: 0 },
        offset: { x: 0, y: 0.5, z: 0 },
        theta: -Math.PI / 4,
        stare_dist: 1.5,
        footstep: 1,
      },
      {
        name: "Eremotherium laurillardi",
        path: "../models/c1/eremotherium/eremotherium_laurillardi-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 7, distance: 4, offset: 2 },
        scale: 0.0008,
        position: { x: -4, y: 1, z: -5 },
        rotation: { x: 0, y: -Math.PI / 4 + (15 * Math.PI) / 180, z: 0 },
        offset: { x: 0, y: 0, z: 0 },
        theta: Math.PI / 4,
        stare_dist: 2.5,
        footstep: 2,
      },
    ],
    soundsFiles: [
      { name: "Mammuthus primigenius (Blumbach)", path: "../Background-Sounds/Chamber1/Object3.mp3", position: { x: 6, y: 0, z: 6 }, volume: 0 },
      { name: "Triceratops horridus", path: "../Background-Sounds/Chamber1/Object4.mp3", position: { x: 6, y: 0, z: -6 }, volume: 0 },
      { name: "Geochelone carbonaria", path: "../Background-Sounds/Chamber1/Object1.mp3", position: { x: -6, y: 0, z: 6 }, volume: 0 },
      { name: "Eremotherium laurillardi", path: "../Background-Sounds/Chamber1/Object2.mp3", position: { x: -6, y: 0, z: -6 }, volume: 0 },
      { name: "gallery", path: "../Background-Sounds/Chamber1/0.mp3", position: { x: 0, y: 0, z: 3 }, volume: 0 },
    ],
  },
  {
    name: "Gallery 2: Ancient Chinese Artifacts",
    data: [
      {
        name: "Fangyi",
        path: "../models/c2/fangyi/fangyi-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 4, distance: 2, offset: 1 },
        scale: 0.0012,
        position: { x: 2, y: 1, z: -21 },
        rotation: { x: 0, y: 0, z: 0 },
        offset: { x: 0, y: 0.75, z: 0 },
        theta: Math.PI / 2,
        stare_dist: 0.65,
        footstep: 1,
      },
      {
        name: "Guang",
        path: "../models/c2/ewer/lidded_ewer-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 5, distance: 2, offset: 1 },
        scale: 1.3,
        position: { x: 2, y: 1, z: -18 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        offset: { x: 0, y: 0.65, z: 0 },
        theta: Math.PI,
        stare_dist: 0.8,
        footstep: 2,
      },
      {
        name: "Beaker-shaped vase",
        path: "../models/c2/vase1/f1980_193-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 2, distance: 1.5, offset: 0.4 },
        scale: 1.2,
        position: { x: -2, y: 1, z: -18 },
        rotation: { x: 0, y: 0, z: 0 },
        offset: { x: 0, y: 0.65, z: 0 },
        theta: -Math.PI / 4,
        stare_dist: 0.65,
        footstep: 1,
      },
      {
        name: "Covered Baluster vase",
        path: "../models/c2/vase2/baluster_vase-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 1.5, distance: 1.5, offset: 0.4 },
        scale: 1.2,
        position: { x: -2, y: 1, z: -21 },
        rotation: { x: 0, y: 0, z: 0 },
        offset: { x: 0, y: 0.6, z: 0 },
        theta: Math.PI * 4,
        stare_dist: 0.8,
        footstep: 1,
      },
    ],
    soundsFiles: [
      { name: "", path: "../Background-Sounds/Chamber2/Object1.mp3", position: { x: 6, y: 0, z: -21 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber2/Object2.mp3", position: { x: 6, y: 0, z: -18 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber2/Object3.mp3", position: { x: -6, y: 0, z: -18 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber2/Object4.mp3", position: { x: -6, y: 0, z: -21 }, volume: 0 },
      { name: "gallery", path: "../Background-Sounds/Chamber2/0.mp3", position: { x: 0, y: 0, z: -20 }, volume: 0 },
    ],
  },
  {
    name: "Gallery 3: In Flight",
    data: [
      {
        name: "1903 Wright Flyer",
        path: "../models/c3/wright/wright_flyer-full_resolution.gltf",
        mesh: null,
        box: null,
        light: { intensity: 4, distance: 6, offset: 2 },
        scale: 0.00055,
        position: { x: 3, y: 1, z: -36 },
        rotation: { x: 0, y: -Math.PI / 2, z: 0 },
        offset: { x: 0, y: 0.2, z: 0 },
        theta: Math.PI * 3,
        stare_dist: 4,
        footstep: 2,
      },
      {
        name: "Bell X-1",
        path: "../models/c3/bell/bell_x1_mesh-web_remap.gltf",
        mesh: null,
        box: null,
        light: { intensity: 5, distance: 5, offset: 2 },
        scale: 0.00085,
        position: { x: -5, y: 1, z: -43 },
        rotation: { x: 0, y: -Math.PI / 4, z: 0 },
        offset: { x: 0, y: -0.5, z: 0 },
        theta: Math.PI / 4,
        stare_dist: 5,
        footstep: 2,
      },
    ],
    soundsFiles: [
      { name: "", path: "../Background-Sounds/Chamber3/Object1.mp3", position: { x: 6, y: 0, z: -36 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber3/Object2.mp3", position: { x: -6, y: 0, z: -43 }, volume: 0 },
      { name: "gallery", path: "../Background-Sounds/Chamber3/0.mp3", position: { x: 0, y: 0, z: -40 }, volume: 0 },
    ],
  },
  {
    name: "Gallery 4: Space Exploration",
    data: [
      {
        name: "Neil Armstrong Spacesuit",
        path: "../models/c4/armstrong/armstrong.gltf",
        mesh: null,
        box: null,
        light: { intensity: 5, distance: 5, offset: 2 },
        scale: 0.1,
        position: { x: 3, y: 1, z: -95 },
        rotation: { x: 0, y: 0, z: 0 },
        offset: { x: 0, y: -0.8, z: 0 },
        theta: Math.PI / 2,
        stare_dist: 1.5,
        footstep: 2,
      },
      {
        name: "Apollo 11 Command Module",
        path: "../models/c4/apollo/apollo_exterior-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 7, offset: -1 },
        scale: 0.012,
        position: { x: 5, y: 1, z: -85 },
        rotation: { x: (10 * Math.PI) / 180, y: Math.PI, z: (25 * Math.PI) / 180 },
        offset: { x: 0, y: -0.8, z: 0 },
        theta: Math.PI * 3,
        stare_dist: 4.5,
        footstep: 2,
      },
      {
        name: "Discovery Space Shuttle",
        path: "../models/c4/space/Orbiter_Space_Shuttle_OV-103_Discovery-150k-4096.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 40, offset: -3 },
        scale: 2,
        position: { x: -25, y: 1, z: -90 },
        rotation: { x: (3 * Math.PI) / 180, y: 0, z: 0 },
        offset: { x: 0, y: -10, z: 0 },
        theta: 0,
        stare_dist: 16,
        footstep: 2,
      },
    ],
    soundsFiles: [
      { name: "", path: "../Background-Sounds/Chamber4/Object1.mp3", position: { x: 3, y: 0, z: -95 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber4/Object2.mp3", position: { x: 5, y: 0, z: -85 }, volume: 0 },
      { name: "", path: "../Background-Sounds/Chamber4/Object3.mp3", position: { x: -25, y: 0, z: -90 }, volume: 0 },
      { name: "gallery", path: "../Background-Sounds/Chamber4/0.mp3", position: { x: 0, y: 0, z: -90 }, volume: 0 },
    ],
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
