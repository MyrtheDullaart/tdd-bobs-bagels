import json from "../inventory.json" assert { type: "json" }

const bagels = json.inventory

class Basket {
    constructor(capacity = 4) {
        this.basket = []
        this.capacity = capacity
        this.total = 0
        this.amount = 0
    }

    add(sku) {
        const found = bagels.find((bagel) => bagel.sku === sku)
        const foundBagelInBasket = this.basket.find((b) => b.sku === found.sku)

        if(this.amount < this.capacity && found && !foundBagelInBasket) {
            found.quantity = 1
            this.amount++
            this.basket.push(found)

            const price = Number(found.price)
            this.total += price

            return this.basket
        } else if (this.amount < this.capacity && found && foundBagelInBasket) {
            found.quantity++
            this.amount++

            const price = Number(found.price)
            this.total += price

            return this.basket
        } else if (this.amount >= this.capacity) {
            throw 'basket is full'
        } else if (!found) {
            throw 'bagel not found'
        }
    }

    price(sku) {
        const found = bagels.find((bagel) => bagel.sku === sku)
        if(found) {
            return found.price
        } else {
            throw 'bagel not found'
        }
    }

    checkOut() {
        return this.total
    }

    remove(sku) {
        const foundIndex = this.basket.findIndex((bagel) => bagel.sku === sku)
        const found = this.basket.find((b) => b.sku === sku)

        if (foundIndex > 0 && found) {
            const price = Number(found.price)
            this.total -= price
            this.basket.splice(foundIndex, 1)
        } else {
            throw 'bagel not found'
        }
    }
}


class Manager {
    constructor (capacity) {
        this.capacity = capacity
        this.basket = this.createBasket()
    }
  
    createBasket() {
        const basket = new Basket(this.capacity)
        return basket
    }
}

export { Manager }
export default Basket