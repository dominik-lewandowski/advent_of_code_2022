import {system, Directory} from './first.js';

const TOTAL_SPACE = 70000000;
const SPACE_LEFT = TOTAL_SPACE - system.root.size;
const REQUIRED_SPACE = 30000000 - SPACE_LEFT;

let smallestMatchingDir = system.root;

(function getSmallestMatchingDir(parentDir) {
    parentDir.content.forEach(item => {
        if (item instanceof Directory) {
            if (item.size < smallestMatchingDir.size && item.size >= REQUIRED_SPACE) {
                smallestMatchingDir = item;
            }
            getSmallestMatchingDir(item);
        }
    });
})(system.root);

console.log("Second: " + smallestMatchingDir.size);
