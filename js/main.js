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

const monsters = Array(6)
  .fill("scary")
  .map(() => new Monster());

let start;
function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  // element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  const slots = Array(rows)
    .fill([])
    .map(() => Array(cols).fill([]));

  monsters.forEach((m) => {
    m.update();
    slots[m.y][m.x] = "monster AARGH!";
  });

  console.log(slots);

  const html = slots
    .map((r, y) => {
      return r.map((c, x) => {
        let cell = "<div class='cell";
        if (pos.x === x && pos.y === y) {
          cell += " active";
        }

        if (c.length > 0) {
          cell += " monster";
        }

        if (pos.x === x && pos.y === y) {
          cell += " active";
        }
        return cell + "'>0</div>";
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
