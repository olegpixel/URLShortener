export default class Link {
    constructor(url) {
      this.long = url
      this.generateHash()
    }

    generateHash() {
        const minInt = 14776336
        const maxInt = 525649985
        const randomInt = Math.floor(Math.random() * (maxInt - minInt)) + minInt
        this.short = randomInt.toString(36)
    }
}
