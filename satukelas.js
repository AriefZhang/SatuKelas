class Dice {
  constructor(num) {
    this.dice = Array.from({ length: num }, () => {
      return Math.ceil(Math.random() * 6);
    });
  }
}

class Player {
  constructor(num) {
    this.user = Array.from({ length: num }, (_, i) => {
      return `Pemain #${i + 1}`;
    });
  }
}

class PlayDice {
  #round;
  constructor(player, dice) {
    this.player = new Player(player);
    this.dice = dice;
    this.#round = 1;
    this.point = new Map()
  }

  get round() {
    return this.#round;
  }

  set round(val) {
    this.#round = val;
  }

  print() {
    let win = false
    let play = true
    let dice = Array.from({length: this.player.user.length}, () => new Dice(this.dice))

    console.log(this.player, dice)

    do {
      console.log("Pemain = " + this.player.user.length + ", Dadu = " + this.dice);
      console.log("=======================");
      console.log("Giliran " + this.round + " lempar dadu:")

      this.player.user.forEach((e,i) => {
        this.point.get(`${i+1}`) ? this.point.get(`${i+1}`) : this.point.set(`${i+1}`, 0)
        console.log(e + " (" + this.point.get(`${i+1}`) + "): " + dice[i].dice)
      })

      this.player.user.forEach((e,i) => {
        dice[i].dice.filter((el,i) => {
          if (el == 6) this.point.set(`${i+1}`, (this.point.get(`${i+1}`) + 1))
          if (el == 6) console.log('sama',i, this.point.get(`${i+1}`))
          return el != 6
        })
        let point = this.point.get(`${i+1}`)
        console.log(e + " (" + point + "): " + dice[i].dice)
      })

      this.round++
      win = true
    } while (!win);

  }
}

let Play = new PlayDice(3, 4);

Play.print()