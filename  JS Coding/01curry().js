/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 * @methods 利用递归的方法
 * @description 柯里化是一种函数的转换，将一个函数从可以调用f(a,b,c)转换为可调用f(a)(b)(c)，柯里化不会调用函数，它只是对函数进行转换
 */
function curry(func) {
    return function curried(...args) {
        // 如果传入的args长度与原始函数所定义的（func.length）相同或者更长，那么只需要使用func.apply将调用传递给它即可
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            // 没有调用func，返回一个包装器，重新应用curried，将之前传入的参数与新的参数一起传入。
            return function (...args2) {
                // 我们再次调用它，我们将得到一个新的部分应用函数（如果没有足够的参数），或者最终的结果
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}



const join = (a, b, c) => {
    console.log(`${a}_${b}_${c}`);
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'

