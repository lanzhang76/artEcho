export const models = [
  {
    name: "Gallery 1: Prehistoric Creatures",
    data: [
      {
        name: "Woolly Mammoths",
        path: "./assets/models/c1/mammoth.gltf",
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
        name: "Triceratops Horridus",
        path: "./assets/models/c1/tricera.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 5, offset: 1 },
        scale: 1,
        position: { x: 4, y: 1, z: 4 },
        rotation: { x: (24 * Math.PI) / 180, y: -Math.PI, z: Math.PI / 2 - 0.4 },
        offset: { x: 0, y: 0.7, z: 0 },
        theta: Math.PI * 3,
        stare_dist: 3.5,
        footstep: 3,
      },
      {
        name: "Red-Footed Tortoise",
        path: "./assets/models/c1/geochelone.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 5, offset: 2 },
        scale: 1,
        position: { x: -4, y: 1, z: 4 },
        rotation: { x: 0, y: Math.PI / 4 + (20 * Math.PI) / 180, z: 0 },
        offset: { x: 0, y: 0.5, z: 0 },
        theta: -Math.PI / 4,
        stare_dist: 1.5,
        footstep: 1,
      },
      {
        name: "Eremotherium Laurillardi",
        path: "./assets/models/c1/eremotherium.gltf",
        mesh: null,
        box: null,
        light: { intensity: 3, distance: 5, offset: 2.1 },
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

      { name: "", path: "./assets/audio/Background-Sounds/Chamber1/Object1.mp3", position: { x: 6, y: 0, z: 6 }, volume: 0, max: 1 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber1/Object2.mp3", position: { x: 6, y: 0, z: -8 }, volume: 0, max: 1 },

      { name: "", path: "./assets/audio/Background-Sounds/Chamber1/Object3.mp3", position: { x: -5, y: 0, z: 6 }, volume: 0, max: 1 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber1/Object4.mp3", position: { x: -6, y: 0, z: -6 }, volume: 0, max: 1 },
      { name: "gallery", path: "./assets/audio/Background-Sounds/Chamber1/0.mp3", position: { x: 0, y: 0, z: -1 }, volume: 0, max: 1 },
    ],
  },
  {
    name: "Gallery 2: Ancient Chinese Artifacts",
    data: [
      {
        name: "Fangyi",
        path: "./assets/models/c2/fangyi.gltf",
        mesh: null,
        box: null,
        light: { intensity: 4, distance: 2, offset: 1 },
        scale: 0.0012,
        position: { x: 2, y: 1, z: -21 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        offset: { x: 0, y: 0.75, z: 0 },
        theta: Math.PI / 2,
        stare_dist: 0.65,
        footstep: 1,
      },
      {
        name: "Guang",
        path: "./assets/models/c2/ewer.gltf",
        mesh: null,
        box: null,
        light: { intensity: 6, distance: 2, offset: 1.1 },
        scale: 1.3,
        position: { x: 2, y: 1, z: -18 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        offset: { x: 0, y: 0.65, z: 0 },
        theta: Math.PI,
        stare_dist: 0.8,
        footstep: 2,
      },
      {
        name: "Beaker-Shaped Vase",
        path: "./assets/models/c2/vase1.gltf",
        mesh: null,
        box: null,
        light: { intensity: 2, distance: 2.2, offset: 1.2 },
        scale: 1.2,
        position: { x: -2, y: 1, z: -18 },
        rotation: { x: 0, y: 0, z: 0 },
        offset: { x: 0, y: 0.65, z: 0 },
        theta: -Math.PI / 4,
        stare_dist: 0.65,
        footstep: 1,
      },
      {
        name: "Covered Baluster Vase",
        path: "./assets/models/c2/vase2.gltf",
        mesh: null,
        box: null,
        light: { intensity: 2, distance: 2.5, offset: 1.4 },
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
      { name: "", path: "./assets/audio/Background-Sounds/Chamber2/Object1.mp3", position: { x: 2, y: 0, z: -23 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber2/Object2.mp3", position: { x: 3, y: 0, z: -18 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber2/Object3.mp3", position: { x: -1000, y: 0, z: -17 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber2/Object4.mp3", position: { x: -2, y: 0, z: -23 }, volume: 0, max: 0.5 },
      { name: "gallery", path: "./assets/audio/Background-Sounds/Chamber2/0.mp3", position: { x: 0, y: 0, z: -20 }, volume: 0, max: 1 },
    ],
  },
  {
    name: "Gallery 3: In Flight",
    data: [
      {
        name: "1903 Wright Flyer",
        path: "./assets/models/c3/wright.gltf",
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
        path: "./assets/models/c3/bell.gltf",
        mesh: null,
        box: null,
        light: { intensity: 5, distance: 6, offset: 2 },
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
      { name: "", path: "./assets/audio/Background-Sounds/Chamber3/Object1.mp3", position: { x: 6, y: 0, z: -36 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber3/Object2.mp3", position: { x: -8, y: 0, z: -43 }, volume: 0, max: 0.5 },
      { name: "gallery", path: "./assets/audio/Background-Sounds/Chamber3/0.mp3", position: { x: 0, y: 0, z: -40 }, volume: 0, max: 1 },
    ],
  },
  {
    name: "Gallery 4: Space Exploration",
    data: [
      {
        name: "Neil Armstrong Spacesuit",
        path: "./assets/models/c4/armstrong.gltf",
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
        path: "./assets/models/c4/apollo.gltf",
        mesh: null,
        box: null,
        light: { intensity: 4, distance: 10, offset: 0 },
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
        path: "./assets/models/c4/space.gltf",
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
      { name: "", path: "./assets/audio/Background-Sounds/Chamber4/Object1.mp3", position: { x: 3, y: 0, z: -96 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber4/Object2.mp3", position: { x: 5, y: 0, z: -87 }, volume: 0, max: 0.5 },
      { name: "", path: "./assets/audio/Background-Sounds/Chamber4/Object3.mp3", position: { x: -25, y: 0, z: -90 }, volume: 0, max: 0.5 },
      { name: "gallery", path: "./assets/audio/Background-Sounds/Chamber4/0.mp3", position: { x: 0, y: 0, z: -91 }, volume: 0, max: 1 },
    ],
  },
  {
    name: "rooms",
    data: [
      { name: "chamber1-room", path: "./assets/models/rooms/chamber1.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: 0 } },
      { name: "chamber2-room", path: "./assets/models/rooms/chamber2.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -19.3 } },
      { name: "chamber3-room", path: "./assets/models/rooms/chamber3.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -38.6 } },
      { name: "chamber4-room", path: "./assets/models/rooms/chamber4.gltf", mesh: null, box: null, scale: 2.5, position: { x: 0, y: 0, z: -90 } },
    ],
  },
];