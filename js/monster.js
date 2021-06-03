import { cols, rows } from "./const";
import { rnd, rndArray, limit } from "./util";

export default class Monster {
  alive = false;
  // vy = rnd(-1, 1);
  init() {
    this.colour = `hsl(${rnd(0, 360)},50%,50%)`;
    this.alive = true;
    this.x = rndArray([-1, cols - 1]);
    this.y = rnd(0, rows);
    this.vx = this.x === -1 ? 1 : -1;
  }

  update() {
    if (this.alive) {
      this.x = this.x + this.vx;
      if (this.x < 0 || this.x >= cols) {
        // offscreen, die
        this.alive = false;
      }
      // this.y = limit(this.y + this.vy, 0, rows);
      // this.x = (this.x + rnd(-1, 1) + cols) % cols;
      // this.y = (this.y + rnd(-1, 1) + rows) % rows;
    } else {
      if (Math.random() > 0.9) {
        // respawn
        this.init();
      }
    }
  }
}
