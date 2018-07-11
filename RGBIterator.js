function RGBIterator(pattern) {
    if (pattern.length != 3 || !(typeof pattern[0] == "number" && typeof pattern[1] == "number" && typeof pattern[2] == "number"))
        throw new Error("Use an array that contains 3 numbers");

    var maxBound = Math.max(...pattern);
    var minBound = Math.min(...pattern);
    var index = { "02": 0, "12": 1, "10": 2, "20": 3, "21": 4, "01": 5 }[pattern.indexOf(maxBound).toString() + pattern.indexOf(minBound).toString()];
    var queue = [1, 0, 2, 1, 0, 2];
    var colors = pattern;

    var even = (n) => { return !(n % 2) }
    var isIndexTaskDone = () => { return (even(index) ? colors[queue[index]] === maxBound : colors[queue[index]] === minBound) }
    var doIndexTask = () => { if (even(index)) colors[queue[index]] += 1; else colors[queue[index]] -= 1 }

    this.next = () => {
        if (!isIndexTaskDone(index)) {
            doIndexTask(index);
        }
        else {
            index = (index == queue.length) ? 0 : index + 1;
            doIndexTask(index);
        }
        return colors.slice(0);
    }
}

let yetAnotherRGBIterator = new RGBIterator([255, 0, 0]);
console.log(yetAnotherRGBIterator.next()); // [255, 1, 0]