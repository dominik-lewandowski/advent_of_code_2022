import * as fs from 'fs';

fs.readFile("./input.txt", "utf8", (error, data) => {
    if (error) {
        throw error;
    }

    let fullyContainedCount = 0;

    const d = data.split("\r\n").map(row => row.split(","));
    d.pop();

    d.forEach(pair => {
        const firstRange = arrayFromRange(pair[0]);
        const secondRange = arrayFromRange(pair[1]);

        for (let num of firstRange) {
            if (secondRange.includes(num)) {
                fullyContainedCount++;
                break;
            }
        }
    });

    console.log(fullyContainedCount);
});

function arrayFromRange(range) {
    const pair = range.split("-").map(r => parseInt(r, 10));
    return Array.from({length: pair[1] - pair[0] + 1}, (_, i) => i + pair[0]);
}
