import * as fs from 'fs';

fs.readFile("./input.txt", "utf8", (error, data) => {
    if (error) {
        throw error;
    }

    let fullyContainedCount = 0;

    const d = data.split("\r\n").map(row => row.split(","));
    d.pop();

    console.log(d);

    d.forEach(pair => {
        const firstRange = pair[0].split("-").map(range => parseInt(range, 10));
        const secondRange = pair[1].split("-").map(range => parseInt(range, 10));

        if (
            (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1])
            || (secondRange[0] >= firstRange[0] && secondRange[1] <= firstRange[1])
        ) {
            fullyContainedCount++;
        }
    });

    console.log(fullyContainedCount);
});
