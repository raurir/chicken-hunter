import Monster from "./monster";
import controls from "./controls";
import { rnd, limit } from "./util";
import { cols, rows } from "./const";

const chicken = document.getElementById("chicken");

const pos = { x: rnd(0, cols), y: rnd(0, rows) };
const move = ({ x = 0, y = 0 }) => {
  pos.x = limit(pos.x + x, 0, cols);
  pos.y = limit(pos.y + y, 0, rows);
};

const dispatch = (keyName) => {
  // console.log(keyName);
  switch (keyName) {
    case "ArrowLeft":
      move({ x: -1 });
      break;
    case "ArrowRight":
      move({ x: 1 });
      break;
    case "ArrowUp":
      move({ y: -1 });
      break;
    case "ArrowDown":
      move({ y: 1 });
      break;
  }
  step();
};

controls(dispatch);

const monsters = Array(6)
  .fill("scary")
  .map(() => new Monster());

let start;
let lastFrame;
function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
    lastFrame = timestamp;
  }
  const elapsed = timestamp - start;
  const elapsedSinceLastFrame = timestamp - lastFrame;

  const action = elapsedSinceLastFrame > 400;

  if (action) {
    lastFrame = timestamp;
  }

  const slots = Array(rows)
    .fill([])
    .map(() => Array(cols).fill([]));

  monsters.forEach((m) => {
    if (action) {
      m.update();
    }
    if (m.alive) {
      slots[m.y][m.x] = m.colour;
    }
  });

  const html = slots
    .map((r, y) =>
      r.map((c, x) => {
        const style = [`left:${(x + 1) * 100}px;`, `top:${y * 100}px;`];
        const classes = ["cell"];
        if (pos.x === x && pos.y === y) {
          classes.push("active");
        }

        if (c.length > 0) {
          style.push(`background:${c}`);
        }

        return `<div class='${classes.join(" ")}' style='${style.join(
          ""
        )}'></div>`;
      })
    )
    .flat()
    .join("");

  chicken.innerHTML = html; // + JSON.stringify(pos);

  // if (elapsed > 1000) {
  // Stop the animation after 2 seconds
  window.requestAnimationFrame(step);
  // }
}

window.requestAnimationFrame(step);
