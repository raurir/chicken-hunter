import { cols, rows } from "./const";
import { rnd, limit } from "./util";
export default class Monster {
  x = rnd(0, cols);
  y = rnd(0, rows);
  // vx = rnd(-1, 1);
  // vy = rnd(-1, 1);
  update() {
    // this.x = limit(this.x + this.vx, 0, cols);
    // this.y = limit(this.y + this.vy, 0, rows);
    this.x = (this.x + rnd(-1, 1) + cols) % cols;
    this.y = (this.y + rnd(-1, 1) + rows) % rows;
  }
}
