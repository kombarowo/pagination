const arrayRange = (from, n) => Array.from({ length: n }, (v, i) => from + i);

const pagination = (cur, total, n = 3) => {
    const from = Math.min(total - n, Math.max(2, cur - Math.trunc(n / 2)));

    var arr1 = [1, '...'],
        arr2 = [],
        arr3 = ['...', total];

    if (total <= arr1.length + n + arr3.length) {
        return arrayRange(1, total);
    } else if (from - 2 <= 1) {
        arr1.pop();
        arr2 = arrayRange(from - (from - 2), n + 1);
    } else if (total - from - n <= 1) {
        arr3.shift();
        arr2 = arrayRange(from - 1 + (total - from - n), n + 1);
    } else {
        arr2 = arrayRange(from, n);
    }

    return [...arr1, ...arr2, ...arr3];
};
