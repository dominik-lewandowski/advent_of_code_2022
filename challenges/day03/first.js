import * as fs from 'fs';

fs.readFile("./input.txt", "utf8", (error, data) => {
    if (error) {
        throw error;
    }

    let prioritiesSum = 0;
    const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
    const priorityScores = {};

    for (let i = 1; i <= alphabet.length; i++) {
        const letter = alphabet[i - 1];
        priorityScores[letter] = i;
        priorityScores[letter.toUpperCase()] = i + 26;
    }
    const d = data.split("\r\n");
    d.pop();
    d.forEach(backpack => {
        const halfSize = Math.ceil(backpack.length / 2);
        const firstCompartment = new Set(backpack.slice(0, halfSize));
        const secondCompartment = new Set(backpack.slice(halfSize));

        for (let letter of firstCompartment.values()) {
            if (secondCompartment.has(letter)) {
                prioritiesSum += priorityScores[letter];
            }
        }
    });

    console.log(prioritiesSum);
});
