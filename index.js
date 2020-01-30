// no loops
// no ifs
// function is a single return
// no side-effects
// no assignments in ƒunctions
// only functions with 0 or 1 args
// everything you do, has to use a function
// no async


// sem loops
// sim ifs
// função tem que ser inline, sem blocos
// Sem efeitos colaterais
// nenhuma atribuição nas funções
// apenas funciona com 0 ou 1 args
// tudo o que você fizer, tem que usar uma função
// sem async


/// part 0 ///
const { warn, log } = console

// bem parecido com f :: a -> b
const ƒ = a => b


// simplest function
// * -> *
const identity = _ => _

// looks weird instead of `add(a, b)` but it has its benefits
const add = a => b => a + b

log(add(2)(5))

// partial application
const add1 = add(1)
const add2 = add(2)
log(add1(7), add2(7))

const compose = g => f => (...v) => g(f(...v))

const add3 = compose(add1)(add2)
const add4 = compose(add2)(add2)


log(add3(3), add4(10))
// add1(
//   add2(
//     3
//   )
// )









/// part 1 ///
// now that we know the rules, let's do a challenge
// make an array with all numbers winthin a range
// divide all numbers `n % 3 === 0` of them by 2
// sum all of them

const range = min => max => min <= max ? [min, ...range(min + 1)(max)] : []
log(range(4)(18))

// that's easy!
log(
  range(1)(5)
    // looks weird, 'a' repeats a lot and ternary is not very clean
    .map(a => a % 3 === 0 ? a / 2 : a)
    // looks like add
    .reduce((b, a) => a + b)
)

// compose functions!!
const ifElse1 = b => t => f => b ? t : f

log(
  range(1)(5)
    // did not improve much, but now we can see an interesting pattern
    // a in all of them, and in JS we can do `map(a => f(a))` into `map(f)`
    .map(ifElse1(
      a => a % 3 === 0
    )(
      a => a / 2
    )(
      identity
    )
    )
    .reduce((b, a) => a + b)
)


const ifElse = b => t => f => a => b(a) ? t(a) : f(a)

const uncurry = f => (a, b) => f(a)(b)
const flip = f => a => b => f(b)(a)

const eq = a => b => a === b
const mod = a => b => a % b
const div = a => b => a / b

// const isMod = a => b => eq(0)(mod(a)(b)) // ??
const isMod = a => compose(eq(0))(mod(a))
const isMod3 = flip(isMod)(3)
const div2 = flip(div)(2)

log(
  range(1)(5)
    .map(
      ifElse
        (isMod3)
        (div2)
        (identity)
    )
    .reduce(uncurry(add))
)



// arr.map(f) to map(f)(arr)
const map = f => ([head, ...tail]) => !!head ? [f(head), ...map(f)(tail)] : []

// arr.reduce(f, b) to reduce(f)(b)(arr)
const reduce = f => b => ([head, ...tail]) => !!head ? reduce(f)(f(b)(head))(tail) : b


const solve1 = compose
  (reduce(add)(0))
  (map(
    ifElse
      (isMod3)
      (div2)
      (identity)
  ))

log(solve1(range(1)(10)))



// part 3 drag and drop
const fromEvent = el => str => fn => el.addEventListener(str, fn)

const pipe = (...fns) => fns.reduceRight(uncurry(compose))

const merge = (...fns) => fn => map(f => f(fn))(fns)

const $div = document.querySelector('div')

const isDown = eq('mousedown')
const isUp = eq('mouseup')

// DMMMU
const isDrag = prevIsDrag => str => isDown(str) || prevIsDrag && !isUp(str)

const scan = f => b => {
  let state = b

  return a => (state = f(state)(a))
}

const updateElPos = el => ({ x, y }) => {
  el.style.left = `${x - el.clientWidth / 2}px`
  el.style.top = `${y - el.clientHeight / 2}px`
}

merge(
  fromEvent(document)('mouseup'),
  fromEvent($div)('mousedown'),
  fromEvent(document)('mousemove'),
)(pipe(
  // scan(boolOrEvent => event => isDrag(!!boolOrEvent)(event.type) && event)(false),
  scan
    (boolOrEvent =>
      ifElse
        (e => isDrag(!!boolOrEvent)(e.type))
        (identity)
        (_ => false)
    )
    (false),
  ifElse
    (Boolean)
    (updateElPos($div))
    (identity),
))


