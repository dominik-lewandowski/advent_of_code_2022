import * as fs from 'fs';

let totalSizeOfMatchingDirs = 0;

class File {
    name;
    size;

    constructor(name, size) {
        this.name = name;
        this.size = parseInt(size, 10);
    }
}

export class Directory extends File {
    parentDir;
    content = new Set();

    constructor(name) {
        super(name, 0);
    }

    addFile(file) {
        if (!this.content.has(file)) {
            this.content.add(file);
            this.size += file.size;
        }
    }

    // Calculate total size once all commands have been processed (see this.calculateSize)
    addDirectory(dir) {
        if (!this.content.has(dir)) {
            this.content.add(dir);
            dir.parentDir = this;
        }
    }

    getDirectory(dirName) {
        let directory;
        this.content.forEach(item => {
            if (item instanceof Directory && item.name === dirName) {
                directory = item;
            }
        });

        if (!directory) {
            throw new Error("Could not find directory " + dirName);
        }

        return directory;
    }

    calculateSize() {
        this.content.forEach(item => {
            if (item instanceof Directory) {
                this.size += item.calculateSize();
            }
        });

        // Puzzle output calculation
        if (this.size <= 100000) {
            totalSizeOfMatchingDirs += this.size;
        }
        return this.size;
    }
}

class Command {
    name;
    value;
    output;

    constructor(log) {
        [this.name, this.value] = log[0].split(" ");
        this.output = log.slice(1);
    }
}

class System {
    root = new Directory("/");
    currentDir = this.root;

    constructor() {
        const data = fs.readFileSync("./input.txt", "utf8");
        data.split("$")
            .filter(v => !!v)
            .forEach((log) => {
                const command = new Command(log.trim().split("\r\n"));
                this.executeCommand(command);
            });
        this.root.calculateSize();
    }

    executeCommand(command) {
        if (!command instanceof Command) {
            throw new Error("Value need to be an instance of Command.");
        }
        switch (command.name) {
            case "cd":
                this.changeDir(command.value);
                break;
            case "ls":
                this.updateDir(command.output);
                break;
            default:
                throw new Error("Unknown command " + command.name + ".");
        }
    }

    /**
     * @private
     */
    changeDir(newDir) {
        if (newDir === "..") {
            this.currentDir = this.currentDir.parentDir;
        } else if (newDir === "/") {
            this.currentDir = this.root;
        } else {
            this.currentDir = this.currentDir.getDirectory(newDir);
        }
    }

    /**
     * @private
     */
    updateDir(lsOutput) {
        lsOutput.forEach(item => {
            item = item.split(" ");
            if (item[0] === "dir") {
                this.currentDir.addDirectory(new Directory(item[1]));
            } else {
                this.currentDir.addFile(new File(item[1], item[0]));
            }
        });
    }
}

export const system = new System();

console.log("First: " + totalSizeOfMatchingDirs);
