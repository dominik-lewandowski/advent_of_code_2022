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
    let d = data.split("\r\n");
    d.pop();

    for (let i = 0; i < d.length - 2; i += 3) {
        const groupedElves = d.slice(i, i + 3).map(v => new Set(v));

        const badge = groupedElves.reduce((acc, current) => {
            if (!acc.length) return Array.from(current);

            return acc.filter(letter => current.has(letter));
        }, [])[0];

        prioritiesSum += priorityScores[badge];
    }

    console.log(prioritiesSum);
});
