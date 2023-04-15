class ApshuService {
    #sizes = {
        "extra-small": 5,
        "small": 11,
        "medium": 16,
        "large": 27,
        "extra-large": 35,
    }

    #cachedResults = new Map()

    #getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    #getSizeRange() {
        const randomNumber = this.#getRandomNumber();

        if (randomNumber <= 5) return [0, this.#sizes["extra-small"]]
        else if (randomNumber > 5 && randomNumber <= 20) return [this.#sizes["extra-small"], this.#sizes["small"]];
        else if (randomNumber > 20 && randomNumber <= 90) return [this.#sizes["small"], this.#sizes["medium"]];
        else if (randomNumber > 90 && randomNumber <= 99) return [this.#sizes["medium"], this.#sizes["large"]];
        else return [this.#sizes["large"], this.#sizes["extra-large"]];
    }

    #getRandomSizeOfApshu() {
        const [min, max] = this.#getSizeRange();

        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    #hasCachedValue(username) {
        const cachedResult = this.#getCachedValue(username);
        if (!cachedResult) return false;

        const isActiveValue = Number(cachedResult.createdAt) > Number(new Date() - 1000 * 10)

        return isActiveValue;
    }

    #getCachedValue(username) {
        const cachedValue = this.#cachedResults.get(username) ?? null;

        return cachedValue;
    }

    #setCachedValue(username, value) {
        this.#cachedResults.set(username, {
            createdAt: new Date(),
            value
        })
    }

    get(username) {
        console.log(this.#hasCachedValue(username), this.#getCachedValue(username)?.value);

        if (this.#hasCachedValue(username)) {
            return this.#getCachedValue(username)?.value;
        } else {
            const newApshu = this.#generateApshu();
            this.#setCachedValue(username, newApshu)

            return newApshu;
        }
    }

    #generateApshu() {
        return `${this.#getRandomSizeOfApshu()} см`
    }
}

const apshuService = new ApshuService();

module.exports = {
    apshuService
}
