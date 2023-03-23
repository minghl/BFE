/**
 * @param { Function } func
 */
function curry(func) {
    return function curried(...args) {
        const complete = args.length >= func.length && !args.slice(0, func.length).includes(curry.placeholder);
        if (complete) return func.apply(this, args)
        return function (...newArgs) {
            // replace placeholders in args with values from newArgs
            let res = [];
            let plh = [];
            if (newArgs.length) {
                res = args.map(arg => arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg);
            } else {
                for (let i = 0; i < args.length; i++) {
                    if (args[i] !== curry.placeholder) {
                        res.push(args[i])
                    } else {
                        plh.push(args[i])
                    }
                }
                res = [...res, ...plh]
            }
            return curried(...res, ...newArgs);
        }
    }
}

const join = (a, b, c) => {
    console.log(`${a}_${b}_${c}`);
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

curriedJoin(1, 2, 3) // '1_2_3'

// 这个例子为什么通过不了？
curriedJoin(_, 2, 3, 4)

curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'