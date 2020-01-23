// no loops
// no ifs
// function is a single return
// no side-fx
// no assignments in ƒunctions
// only functions with 0 or 1 args




/// part 0 ///
const { log } = console

// simplest function
// * -> *
const identity = _ => _

// looks weird instead of `add(a, b)` but it has its benefits
// a -> a -> a
const add = a => b => a + b

log(add(2)(5))

// a -> a
const add1 = add(1)

log(add1(7))



/// part 1 ///
// now that we know the rules, let's do a challenge
// make an array with all numbers winthin a range

const range = min => max => min <= max ? [min, ...range(min + 1)(max)] : []
log(range(4)(18))

// (a -> b) -> [a] -> [b]
const map = f => ([head, ...tail]) => !!head ? [f(head), ...map(f)(tail)] : []

// (b -> a -> b) -> b -> [a] -> b
const reduce = fbab => b => ([head, ...tail]) => !!head ? reduce(fbab)(fbab(b)(head))(tail) : b

log(reduce(add)(0)([1, 2, 3, 4]))
log(reduce(b => a => ({ ...b, [a]: 12 }))()([1, 2, 3, 4]))

const compose = g => f => valor =>
  g(
    f(
      valor
    )
  )

// fizzbuzz
// n % 3 == 0 -> fizz
// n % 5 == 0 -> buzz
// ambos -> fizzbuzz

const fizzbuzz = n =>
  (n % 3 === 0 ? 'fizz' : '') +
  (n % 5 === 0 ? 'buzz' : '') ||
  n

const solve = map(fizzbuzz)

log(solve(range(1)(100)))


// part 3
const fromEvent = (el, str) => fn => el.addEventListener(str, fn)

const merge = (...fns) => fn => map(f => f(fn))(fns)

const $div = document.querySelector('div')

merge(
  fromEvent($div, 'mouseup'),
  fromEvent($div, 'mousedown'),
)(pipe(
  ({ x }) => x,
  console.log
))