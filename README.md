### Desk Visualiser

An interactive React app for designing a single–pedestal wooden desk. You can experiment with different desk configurations and instantly see both a schematic front view and a concise cut‑list of parts and measurements.

The total desk length is fixed at **110 cm**; you adjust how much of that is left open for leg/chair space vs. used by a drawer unit, along with overall height, depth, and individual drawer heights.

---

### Features

- **Interactive desk layout**
  - Adjust the open (chair) side width with a slider.
  - Control the overall desk height and depth.
  - Add or remove drawers (up to a small stack) and set individual drawer heights.

- **Live schematic visualisation**
  - SVG front view of the desk showing:
    - Desktop, legs, and drawer unit.
    - Drawer fronts with colour-coded heights.
    - Dimension annotations for total width and height.
  - “Chair space” area labelled to understand leg room clearly.

- **Cut‑list and measurements**
  - Auto‑generated table listing:
    - Desktop panel dimensions.
    - Drawer unit side, back, and bottom panels.
    - Drawer front dimensions for each configured drawer.
  - All values update in real time as you change the configuration.

- **Space validation**
  - Summary indicator showing whether your chosen drawer heights fit within the available internal height of the drawer unit.
  - Warnings when drawers overflow the available space, so you can quickly adjust dimensions.

---

### Running the project

- **Install dependencies**

  ```bash
  npm install
  ```

- **Start the development server**

  ```bash
  npm start
  ```

  Then open `http://localhost:3000` in your browser. The app will reload automatically as you edit the code.

- **Build for production**

  ```bash
  npm run build
  ```

  This generates an optimized production bundle in the `build` directory.

---

### How to use the visualiser

- **Desk dimensions panel**
  - Use the **Open (chair) side** slider to choose how much of the 110 cm total length is left open for leg room.
  - Adjust **Desk depth** and **Desk height** to match your intended build.

- **Drawer configuration panel**
  - Use the **Number of drawers** controls to add or remove drawers in the right‑hand pedestal.
  - For each drawer, drag its slider to set the **drawer front height** (in cm).
  - Watch the **remaining/overflow space** indicator to confirm that the stack of drawers fits within the available cabinet height.

- **Reading the schematic**
  - The **top SVG** gives a front elevation: open leg space on the left, drawer unit on the right.
  - Labels above the drawing show the split between open space and drawer unit width.
  - A vertical dimension arrow on the left shows overall desk height, and a horizontal arrow below shows the fixed 110 cm total length.

- **Reading the cut list**
  - The **Cut List Summary** table lists each part with:
    - **Width** (left to right),
    - **Depth** (front to back),
    - **Thickness** of the material assumed in the model.
  - Use this as a starting point for a cutting plan; always double‑check dimensions against your own material and construction method.

---

### Tech stack and structure

- **Tech**
  - React (functional components + hooks).
  - Plain CSS via `index.css` for base styles (most layout is inline styles in `App`).

- **Key files**
  - `src/App.js` – main desk designer UI, SVG schematic, controls, and cut‑list logic.
  - `src/index.js` – React entry point that mounts `App`.
  - `src/index.css` – global base styles for the page.

Tests and CRA boilerplate utilities have been removed to keep the project minimal and focused on the interactive visualiser.
