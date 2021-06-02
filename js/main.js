const cols = 10;
const rows = 5;

const slots = Array(rows)
  .fill([])
  .map((_, c) => Array(cols).fill(""));

const chicken = document.getElementById("chicken");

// console.log(slots);

const pos = [0, 0];
const move = ([x, y]) => {
  pos[0] += x;
  pos[1] += y;
  console.log(x, y, pos);
};

global.dispatch = (keyName) => {
  console.log(keyName);
  switch (keyName) {
    case "ArrowLeft":
      move([-1, 0]);
      break;
    case "ArrowRight":
      move([1, 0]);
      break;
    case "ArrowUp":
      move([0, -1]);
      break;
    case "ArrowDown":
      move([0, 1]);
      break;
  }
};

let start;
function step(timestamp) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  // element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  let html = slots
    .map((r, y) => {
      return r.map((c, x) => {
        if (pos[0] === x && pos[1] === y) {
          return "<div class='cell active'></div>";
        }
        if (c === "") {
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
