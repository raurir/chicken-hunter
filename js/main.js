import Monster from "./monster";
import controls from "./controls";

const cols = 10;
const rows = 5;

const slots = Array(rows)
  .fill([])
  .map((_, c) => Array(cols).fill([]));

const chicken = document.getElementById("chicken");

const rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);
const limit = (input, min, max) => Math.min(Math.max(input, min), max - 1);

const pos = { x: rnd(0, cols), y: rnd(0, rows) };
const move = ({ x = 0, y = 0 }) => {
  pos.x = limit(pos.x + x, 0, cols);
  pos.y = limit(pos.y + y, 0, rows);
};

const dispatch = (keyName) => {
  console.log(keyName);
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

const c2 = controls(dispatch);

const m = new Monster();

let start;
function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  // element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  m.update();

  const html = slots
    .map((r, y) => {
      return r.map((c, x) => {
        if (m.x === pos.x && m.y === pos.y) {
          alert("you d@e@a@d!");
        }

        if (pos.x === x && pos.y === y) {
          return "<div class='cell active'></div>";
        }

        if (m.x === x && m.y === y) {
          return "<div class='cell monster'></div>";
        }

        if (pos.x === x && pos.y === y) {
          return "<div class='cell active'></div>";
        }
        if (c.length === 0) {
          return "<div class='cell empty'></div>";
        }
        return "<div class='cell something'></div>";
      });
    })
    .flat()
    .join("");

  chicken.innerHTML = html + JSON.stringify(pos);

  // if (elapsed < 2000) { // Stop the animation after 2 seconds
  // window.requestAnimationFrame(step);
  // }
}

window.requestAnimationFrame(step);
