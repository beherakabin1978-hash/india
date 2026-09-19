import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/* =========================================================
   INDIA 3D EXPLORER
   ========================================================= */


/* =========================================================
   INDIA STATE DATA
   ========================================================= */

const states = {

  "Andhra Pradesh": [
    "Visakhapatnam",
    "Pulihora",
    "🏖️"
  ],

  "Arunachal Pradesh": [
    "Tawang",
    "Thukpa",
    "🏔️"
  ],

  "Assam": [
    "Kaziranga National Park",
    "Masor Tenga",
    "🦏"
  ],

  "Bihar": [
    "Bodh Gaya",
    "Litti Chokha",
    "🛕"
  ],

  "Chhattisgarh": [
    "Chitrakote Falls",
    "Faraa",
    "💧"
  ],

  "Goa": [
    "Old Goa",
    "Goan Fish Curry",
    "🌴"
  ],

  "Gujarat": [
    "Statue of Unity",
    "Dhokla",
    "🦁"
  ],

  "Haryana": [
    "Kurukshetra",
    "Bajra Roti",
    "🌾"
  ],

  "Himachal Pradesh": [
    "Manali",
    "Dham",
    "🏔️"
  ],

  "Jharkhand": [
    "Netarhat",
    "Dhuska",
    "🌲"
  ],

  "Karnataka": [
    "Hampi",
    "Masala Dosa",
    "🏛️"
  ],

  "Kerala": [
    "Munnar",
    "Appam and Sadya",
    "🌴"
  ],

  "Madhya Pradesh": [
    "Khajuraho",
    "Poha",
    "🗿"
  ],

  "Maharashtra": [
    "Mumbai",
    "Vada Pav",
    "🌆"
  ],

  "Manipur": [
    "Loktak Lake",
    "Eromba",
    "🌊"
  ],

  "Meghalaya": [
    "Cherrapunji",
    "Jadoh",
    "☁️"
  ],

  "Mizoram": [
    "Aizawl",
    "Bai",
    "⛰️"
  ],

  "Nagaland": [
    "Kohima",
    "Smoked Pork",
    "🌿"
  ],

  "Odisha": [
    "Puri and Konark",
    "Dalma / Chhena Poda",
    "🛕"
  ],

  "Punjab": [
    "Golden Temple",
    "Amritsari Kulcha",
    "🌾"
  ],

  "Rajasthan": [
    "Jaipur",
    "Dal Baati Churma",
    "🐪"
  ],

  "Sikkim": [
    "Gangtok",
    "Momos",
    "🏔️"
  ],

  "Tamil Nadu": [
    "Mahabalipuram",
    "Pongal",
    "🛕"
  ],

  "Telangana": [
    "Hyderabad",
    "Hyderabadi Biryani",
    "🍛"
  ],

  "Tripura": [
    "Agartala",
    "Mui Borok",
    "🌿"
  ],

  "Uttar Pradesh": [
    "Taj Mahal / Varanasi",
    "Awadhi Cuisine",
    "🕌"
  ],

  "Uttarakhand": [
    "Nainital",
    "Aloo Ke Gutke",
    "🏔️"
  ],

  "West Bengal": [
    "Kolkata / Sundarbans",
    "Rosogolla",
    "🐯"
  ]

};


/* =========================================================
   FAMOUS PLACES
   ========================================================= */

const places = [

  [
    "🕌",
    "Taj Mahal",
    "Agra, Uttar Pradesh",
    "A world-famous monument and UNESCO World Heritage Site."
  ],

  [
    "🏛️",
    "Gateway of India",
    "Mumbai, Maharashtra",
    "An iconic waterfront landmark overlooking the Arabian Sea."
  ],

  [
    "🛕",
    "Golden Temple",
    "Amritsar, Punjab",
    "A famous Sikh shrine known for its beautiful golden architecture."
  ],

  [
    "🏰",
    "Hawa Mahal",
    "Jaipur, Rajasthan",
    "The famous Palace of Winds with its distinctive windows."
  ],

  [
    "🛕",
    "Konark Sun Temple",
    "Odisha",
    "A historic temple famous for its stone chariot architecture."
  ],

  [
    "🏛️",
    "Charminar",
    "Hyderabad, Telangana",
    "One of Hyderabad's most recognizable historical landmarks."
  ]

];


/* =========================================================
   FAMOUS DISHES
   ========================================================= */

const dishes = [

  [
    "🍛",
    "Biryani",
    "Hyderabad",
    "Aromatic rice prepared with spices and flavorful ingredients."
  ],

  [
    "🥞",
    "Masala Dosa",
    "South India",
    "A crispy fermented rice-and-lentil crepe served with fillings."
  ],

  [
    "🍲",
    "Rogan Josh",
    "Kashmir",
    "A traditional Kashmiri curry prepared with aromatic spices."
  ],

  [
    "🥮",
    "Dhokla",
    "Gujarat",
    "A soft steamed snack made from fermented batter."
  ],

  [
    "🍚",
    "Dalma",
    "Odisha",
    "A traditional dish made with lentils, vegetables and spices."
  ],

  [
    "🍡",
    "Rosogolla",
    "West Bengal",
    "A popular Bengali sweet made from soft chhena balls."
  ]

];


/* =========================================================
   HTML ELEMENTS
   ========================================================= */

const canvas = document.querySelector("#canvas");
const loading = document.querySelector("#loading");
const info = document.querySelector("#info");
const placeCards = document.querySelector("#placeCards");
const dishCards = document.querySelector("#dishCards");
const resetButton = document.querySelector("#reset");
const exploreButton = document.querySelector("#explore");


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (!canvas) {

  console.error(
    "ERROR: #canvas was not found in index.html"
  );

  throw new Error(
    "Canvas element is missing."
  );

}


/* =========================================================
   CREATE PLACE CARDS
   ========================================================= */

if (placeCards) {

  placeCards.innerHTML = places
    .map(place => {

      return `
        <article class="card">

          <div class="icon">
            ${place[0]}
          </div>

          <span class="tag">
            ${place[2]}
          </span>

          <h3>
            ${place[1]}
          </h3>

          <p>
            ${place[3]}
          </p>

        </article>
      `;

    })
    .join("");

}


/* =========================================================
   CREATE DISH CARDS
   ========================================================= */

if (dishCards) {

  dishCards.innerHTML = dishes
    .map(dish => {

      return `
        <article class="card">

          <div class="icon">
            ${dish[0]}
          </div>

          <span class="tag">
            ${dish[2]}
          </span>

          <h3>
            ${dish[1]}
          </h3>

          <p>
            ${dish[3]}
          </p>

        </article>
      `;

    })
    .join("");

}


/* =========================================================
   THREE.JS SCENE
   ========================================================= */

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x07111f);


/* =========================================================
   CAMERA
   ========================================================= */

const camera =
  new THREE.PerspectiveCamera(
    42,
    1,
    0.1,
    1000
  );

camera.position.set(
  0,
  8,
  15
);


/* =========================================================
   RENDERER
   ========================================================= */

const renderer =
  new THREE.WebGLRenderer({

    canvas: canvas,

    antialias: true,

    powerPreference: "high-performance"

  });


renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio || 1,
    2
  )
);


renderer.outputColorSpace =
  THREE.SRGBColorSpace;


/* =========================================================
   ORBIT CONTROLS
   ========================================================= */

const controls =
  new OrbitControls(
    camera,
    canvas
  );


controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.minDistance = 6;

controls.maxDistance = 25;

controls.maxPolarAngle =
  Math.PI * 0.82;

controls.minPolarAngle =
  0.15;

controls.enablePan = true;


/* =========================================================
   LIGHTING
   ========================================================= */

const hemisphereLight =
  new THREE.HemisphereLight(
    0xcce3ff,
    0x101b2b,
    2.5
  );

scene.add(
  hemisphereLight
);


const mainLight =
  new THREE.DirectionalLight(
    0xffffff,
    3
  );

mainLight.position.set(
  8,
  15,
  8
);

scene.add(
  mainLight
);


const blueLight =
  new THREE.DirectionalLight(
    0x6ea8ff,
    1.5
  );

blueLight.position.set(
  -10,
  8,
  -8
);

scene.add(
  blueLight
);


/* =========================================================
   INDIA GROUP
   ========================================================= */

const indiaGroup =
  new THREE.Group();

indiaGroup.rotation.x =
  -0.35;

scene.add(
  indiaGroup
);


/* =========================================================
   SIMPLIFIED INDIA OUTLINE
   ========================================================= */

const indiaOutline = [

  [-1.7, 5.4],
  [-0.9, 6.0],
  [0.1, 5.7],
  [1.0, 5.2],
  [1.8, 4.4],
  [2.3, 3.6],
  [2.0, 2.8],
  [1.6, 2.0],
  [1.2, 1.2],
  [0.8, 0.2],
  [0.5, -0.9],
  [0.0, -2.1],
  [-0.4, -3.2],
  [-0.8, -4.4],
  [-1.2, -3.5],
  [-1.4, -2.5],
  [-1.7, -1.5],
  [-2.0, -0.4],
  [-2.4, 0.7],
  [-2.8, 1.7],
  [-3.1, 2.8],
  [-2.9, 3.7],
  [-2.4, 4.6]

];


/* =========================================================
   CREATE INDIA
   ========================================================= */

function createIndia() {

  const shape =
    new THREE.Shape();


  indiaOutline.forEach(
    (point, index) => {

      const x = point[0];
      const y = point[1];


      if (index === 0) {

        shape.moveTo(
          x,
          y
        );

      } else {

        shape.lineTo(
          x,
          y
        );

      }

    }
  );


  shape.closePath();


  const geometry =
    new THREE.ExtrudeGeometry(
      shape,
      {

        depth: 0.65,

        bevelEnabled: true,

        bevelSegments: 4,

        bevelSize: 0.08,

        bevelThickness: 0.08

      }
    );


  geometry.rotateX(
    Math.PI / 2
  );


  const material =
    new THREE.MeshStandardMaterial({

      color: 0xf28c28,

      metalness: 0.25,

      roughness: 0.42

    });


  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.castShadow = true;

  mesh.receiveShadow = true;

  mesh.userData.name =
    "India";


  indiaGroup.add(
    mesh
  );


  return mesh;

}


createIndia();


/* =========================================================
   INDIA BORDER
   ========================================================= */

const borderPoints =
  indiaOutline.map(
    point => {

      return new THREE.Vector3(
        point[0],
        0.38,
        point[1]
      );

    }
  );


borderPoints.push(
  borderPoints[0].clone()
);


const borderGeometry =
  new THREE.BufferGeometry()
    .setFromPoints(
      borderPoints
    );


const borderMaterial =
  new THREE.LineBasicMaterial({

    color: 0xffffff,

    transparent: true,

    opacity: 0.85

  });


const border =
  new THREE.Line(
    borderGeometry,
    borderMaterial
  );


indiaGroup.add(
  border
);


/* =========================================================
   STATE REGIONS
   ========================================================= */

const stateNames =
  Object.keys(states);


const statePositions = [

  [-1.4, 4.3],
  [-0.7, 5.0],
  [0.3, 4.7],
  [1.1, 4.0],
  [1.6, 3.1],
  [1.4, 2.3],
  [0.9, 1.6],
  [0.4, 1.0],
  [0.0, 0.3],
  [-0.4, -0.6],
  [-0.7, -1.5],
  [-1.0, -2.4],
  [-1.2, -3.3],
  [-1.7, -2.2],
  [-2.0, -1.0],
  [-2.3, 0.2],
  [-2.5, 1.3],
  [-2.4, 2.4],
  [-2.1, 3.4],
  [-1.7, 4.0],
  [-1.1, 3.5],
  [-0.4, 3.8],
  [0.4, 3.5],
  [0.9, 2.8],
  [0.5, 2.0],
  [-0.2, 1.7],
  [-0.8, 1.2],
  [-1.3, 0.5]

];


const stateObjects = [];


/* =========================================================
   CREATE CLICKABLE STATE BLOCKS
   ========================================================= */

function createStateBlock(
  name,
  position,
  index
) {

  const geometry =
    new THREE.BoxGeometry(
      0.65,
      0.18,
      0.55
    );


  const hue =
    (index * 0.067) % 1;


  const material =
    new THREE.MeshStandardMaterial({

      color:
        new THREE.Color().setHSL(
          hue,
          0.65,
          0.48
        ),

      metalness: 0.15,

      roughness: 0.5

    });


  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.position.set(
    position[0],
    0.48,
    position[1]
  );


  mesh.castShadow = true;


  mesh.userData.name =
    name;


  mesh.userData.originalScale =
    new THREE.Vector3(
      1,
      1,
      1
    );


  indiaGroup.add(
    mesh
  );


  stateObjects.push(
    mesh
  );


  return mesh;

}


/* =========================================================
   CREATE ALL STATE BLOCKS
   ========================================================= */

stateNames.forEach(
  (name, index) => {

    if (
      statePositions[index]
    ) {

      createStateBlock(
        name,
        statePositions[index],
        index
      );

    }

  }
);


/* =========================================================
   NORTH EAST REGION
   ========================================================= */

const northEastGeometry =
  new THREE.BoxGeometry(
    1.4,
    0.2,
    0.75
  );


const northEastMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x5cb85c,

    metalness: 0.15,

    roughness: 0.5

  });


const northEast =
  new THREE.Mesh(
    northEastGeometry,
    northEastMaterial
  );


northEast.position.set(
  2.2,
  0.5,
  4.8
);


northEast.userData.name =
  "North East India";


indiaGroup.add(
  northEast
);


/* =========================================================
   RAYCASTER
   ========================================================= */

const raycaster =
  new THREE.Raycaster();


const mouse =
  new THREE.Vector2();


/* =========================================================
   SHOW INFORMATION
   ========================================================= */

function showInfo(name) {

  if (!info) return;


  const data =
    states[name];


  if (!data) {

    info.innerHTML = `

      <div class="region">
        🇮🇳 ${name}
      </div>

      <div class="sub">
        Selected on the 3D map
      </div>

      <div class="detail">

        <strong>
          EXPLORE INDIA
        </strong>

        <p>
          Rotate and zoom the 3D map
          to explore India.
        </p>

      </div>

    `;

    return;

  }


  info.innerHTML = `

    <div class="region">
      ${data[2]} ${name}
    </div>

    <div class="sub">
      Selected on the 3D map
    </div>

    <div class="detail">

      <strong>
        📍 FAMOUS PLACE
      </strong>

      <p>
        ${data[0]}
      </p>

    </div>

    <div class="detail">

      <strong>
        🍛 FAMOUS DISH
      </strong>

      <p>
        ${data[1]}
      </p>

    </div>

  `;

}


/* =========================================================
   HIGHLIGHT SELECTED REGION
   ========================================================= */

function clearHighlights() {

  stateObjects.forEach(
    object => {

      object.scale.set(
        1,
        1,
        1
      );

    }
  );

}


function highlight(object) {

  clearHighlights();


  if (object) {

    object.scale.set(
      1.08,
      1.8,
      1.08
    );

  }

}


/* =========================================================
   CLICK EVENT
   ========================================================= */

canvas.addEventListener(
  "click",
  event => {

    const rect =
      canvas.getBoundingClientRect();


    mouse.x =
      (
        (event.clientX -
          rect.left) /
        rect.width
      ) * 2 - 1;


    mouse.y =
      -(
        (
          event.clientY -
          rect.top
        ) /
        rect.height
      ) * 2 + 1;


    raycaster.setFromCamera(
      mouse,
      camera
    );


    const objects =
      stateObjects.concat(
        northEast
      );


    const hits =
      raycaster.intersectObjects(
        objects,
        false
      );


    if (!hits.length) {

      clearHighlights();

      return;

    }


    const selected =
      hits[0].object;


    const name =
      selected.userData.name;


    showInfo(name);

    highlight(selected);

  }
);


/* =========================================================
   HOVER CURSOR
   ========================================================= */

canvas.addEventListener(
  "pointermove",
  event => {

    const rect =
      canvas.getBoundingClientRect();


    mouse.x =
      (
        (event.clientX -
          rect.left) /
        rect.width
      ) * 2 - 1;


    mouse.y =
      -(
        (
          event.clientY -
          rect.top
        ) /
        rect.height
      ) * 2 + 1;


    raycaster.setFromCamera(
      mouse,
      camera
    );


    const hits =
      raycaster.intersectObjects(
        stateObjects.concat(
          northEast
        ),
        false
      );


    canvas.style.cursor =
      hits.length
        ? "pointer"
        : "grab";

  }
);


/* =========================================================
   RESET BUTTON
   ========================================================= */

if (resetButton) {

  resetButton.addEventListener(
    "click",
    () => {

      camera.position.set(
        0,
        8,
        15
      );


      controls.target.set(
        0,
        0,
        0
      );


      controls.update();


      clearHighlights();


      showInfo("India");

    }
  );

}


/* =========================================================
   EXPLORE BUTTON
   ========================================================= */

if (exploreButton) {

  exploreButton.addEventListener(
    "click",
    () => {

      const map =
        document.querySelector(
          "#map"
        );


      if (map) {

        map.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


/* =========================================================
   RESPONSIVE CANVAS
   ========================================================= */

function resize() {

  const rect =
    canvas.getBoundingClientRect();


  const width =
    Math.max(
      rect.width,
      1
    );


  const height =
    Math.max(
      rect.height,
      1
    );


  renderer.setSize(
    width,
    height,
    false
  );


  camera.aspect =
    width / height;


  camera.updateProjectionMatrix();

}


window.addEventListener(
  "resize",
  resize
);


resize();


/* =========================================================
   REMOVE LOADING SCREEN
   ========================================================= */

if (loading) {

  setTimeout(
    () => {

      loading.classList.add(
        "done"
      );

    },
    500
  );

}


/* =========================================================
   DEFAULT INFO
   ========================================================= */

showInfo("India");


/* =========================================================
   ANIMATION
   ========================================================= */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const time =
    clock.getElapsedTime();


  /*
     Small floating movement
     makes the map feel 3D.
  */

  indiaGroup.position.y =
    Math.sin(
      time * 0.8
    ) * 0.08;


  /*
     Very small automatic rotation.
     User can still freely rotate
     with the mouse.
  */

  indiaGroup.rotation.z =
    Math.sin(
      time * 0.25
    ) * 0.015;


  controls.update();


  renderer.render(
    scene,
    camera
  );

}


animate();


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
  "🇮🇳 India 3D Explorer loaded successfully!"
);
