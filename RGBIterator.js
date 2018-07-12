function RGBIterator(pattern) {
    var maxBound = Math.max(...pattern);
    var minBound = Math.min(...pattern);
    var index = { "00": 0, "02": 0, "12": 1, "10": 2, "20": 3, "21": 4, "01": 5 }[pattern.indexOf(maxBound).toString() + pattern.indexOf(minBound).toString()];
    var queue = [1, 0, 2, 1, 0, 2];
    var colors = pattern;

    var even = (n) => { return !(n % 2) };
    var isIndexTaskDone = () => { return (even(index)) ? colors[queue[index]] == maxBound : colors[queue[index]] == minBound };
    var doIndexTask = () => { if (!isIndexTaskDone()) (even(index)) ? colors[queue[index]]++ : colors[queue[index]]-- };

    this.next = () => {
        if (isIndexTaskDone()) index = (index == queue.length - 1) ? 0 : index + 1;
        doIndexTask();
        return colors.slice(0);
    }
}

let iterator = new RGBIterator([1, 0, 0]);
console.log(iterator.next()) // [1, 1, 0]