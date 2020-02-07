// sem for/while loops
// sem ifs
// função tem que ser inline, sem blocos
// Sem efeitos colaterais
// nenhuma atribuição nas funções
// apenas funciona com 0 ou 1 args
// tudo o que você fizer, tem que usar uma função
// sem async

const { log } = console

const identity = a => a

// criar um range
const range = min => max => min <= max ? [min, ...range(min + 1)(max)] : []

log(
  'range test',
  range(1)(10)
)



// const ifElse = condition => then => or => condition ? then : or
const ifElse = condition => then => or => x => condition(x) ? then(x) : or(x)

const mod = a => b => a % b
const add = a => b => a + b
const div = a => b => a / b
const eq = a => b => a === b

const flip = f => b => a => f(a)(b)
const compose = g => f => x => g(f(x))


const mod5 = flip(mod)(5)
const div2 = flip(div)(2)
const eq0 = eq(0)
const isDiv5 = compose(eq0)(mod5)

const curry = f => a => b => f(a, b)
const uncurry = f => (a, b) => f(a)(b)

const map = f => arr => arr.map(f)
const reduce = f => arr => arr.reduce(uncurry(f))
const reduceRight = f => arr => arr.reduceRight(uncurry(f))

const pipe = (...fns) => reduceRight(compose)(fns)

const solve = pipe(
  map(
    ifElse (isDiv5)
           (div2)
           (identity)
  ),
  reduce(add)
)

const add1 = add(1)
const add4 = pipe(
  add1,
  add1,
  add1,
  add1,
)

log(
  add4(10),
  solve(range(1)(10))
)

