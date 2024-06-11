'use strict'

function getCars() {
    fetch('/api/car')
        .then(res => res.json())
        .then(cars => {
            const elPre = document.querySelector('pre')
            elPre.innerHTML = JSON.stringify(cars, null, 2)
        })
}