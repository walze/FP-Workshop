import { fromEvent, interval } from "rxjs"
import { map, flatMap, debounce } from "rxjs/operators"
import { pipe, compose, tap, nth, either } from "ramda"

const API = url => fetch('https://reqres.in/api' + url)

const setInnerHTML = el => str => el.innerHTML = str

const thrower = a => b => { throw new Error([a, b]) }

// part 4
const $input = document.querySelector('input')
const $fetch = document.querySelector('#fetch')

fromEvent($input, 'input')
  .pipe(
    debounce(_ => interval(500)),
    map(e => e.target.value),
    flatMap(n => API('/users/' + n)),
    flatMap(p => Promise.all([p.json(), p])),
    map(([{ data }, r]) => [data, r]),
  )
  .subscribe(pipe(
    either(
      nth(0),
      pipe(nth(1), e => e.status, tap(console.error))
    ),

    compose(setInnerHTML($fetch), JSON.stringify)
  ))
