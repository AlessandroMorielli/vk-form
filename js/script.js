"use strict"

/**
 * Эмуляция загрузки данных с сервера
 * Ряд этажей и комнат рандомно пропущены, для имитации их брони
 * select подгружается динамически
 */

const rooms = {
    'A': {},
    'B': {}
}

for (let key in rooms) {
    let booked = Math.floor(Math.random() * 27)
    for (let i = 3; i <= 27; i++) {
        if (i === booked) continue;
        rooms[key][i] = [];
        let bookedRoom = Math.floor(Math.random() * 10)
        for (let j = 1; j <= 10; j++) {
            if (j === bookedRoom) continue;
            rooms[key][i].push(j);
        }
    }
}

let elems = document.forms.booking.elements;

setMinDate();

function setMinDate() {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + 1)
    let month = minDate.getMonth() + 1 < 10 ? `0${minDate.getMonth() + 1}` : minDate.getMonth() + 1;
    let day = minDate.getDate() < 10 ? `0${minDate.getDate()}` : minDate.getDate();
    let attrValue = `${minDate.getFullYear()}-${month}-${day}`
    elems.date.setAttribute('min', attrValue)
}

elems.section.addEventListener('change', () => {
    elems.floor.innerHTML = '';
    disableSelect(elems.room);
    if (elems.section.value) {
        enableSelect(elems.floor)
        let option = new Option('Выберите этаж', '', true, true);
        elems.floor.append(option);
        for (let key in rooms[elems.section.value]) {
            let newOption = new Option(key, key);
            elems.floor.append(newOption);
        }
    } else {
        disableSelect(elems.floor);
    }
})

elems.floor.addEventListener('change', () => {
    elems.room.innerHTML = '';
    if (elems.floor.value) {
        enableSelect(elems.room)
        let option = new Option('Выберите комнату', '', true, true);
        elems.room.append(option);
        for (let value of rooms[elems.section.value][elems.floor.value]) {
            let newOption = new Option(value, value);
            elems.room.append(newOption);
        }
    } else {
        disableSelect(elems.room)
    }
})

function enableSelect(element) {
    element.setAttribute('required', '');
    element.removeAttribute('disabled')
}

function disableSelect(element) {
    element.setAttribute('disabled', '');
    element.removeAttribute('required')
    element.innerHTML = '';
}

elems.clear.addEventListener('click', () => {
    disableSelect(elems.floor);
    disableSelect(elems.room);

})

document.addEventListener('submit', (e) => {
    e.preventDefault();
    let bookingInfo = {};
    for (let i = 0; i < 6; i++) {
        bookingInfo[elems[i].name] = elems[i].value
        elems[i].value = '';
    }
    disableSelect(elems.floor);
    disableSelect(elems.room);
    console.log(JSON.stringify(bookingInfo));
})