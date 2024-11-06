const canBtn = document.getElementById('canbtn')
const listBox = document.getElementById('listbox')
const tagLine = document.getElementById('tagline')
const addInput = document.getElementById('addInput')
const body = document.getElementById('body')
const baseUrl = 'https://shatteredsnowman.com/'
console.log('canList')
// arrays for storing the lists 

let cantList = []
let canList = []

 function test() {

     fetch(`${baseUrl}canList`, {
        method: 'GET'
    }).then((response) => {
        response.json().then((jsonResponse) => {
            canList = jsonResponse
        })
    }).catch((err) => {
        console.log(`Error: ${err}`)
    })


     fetch(`${baseUrl}cantList`, {
        method: 'GET'
    }).then((response) => {
        response.json().then((jsonResponse) => {
            cantList = JSON.parse(jsonResponse)
        })
    }).catch((err) => {
        console.log(`Error: ${err}`)
    })

}
test()
addInput.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
        const inputVal = addInput.value
        addInput.value = ''
        const div = document.createElement('div')
        div.innerText = inputVal
        document.querySelector('.text-container').appendChild(div)
        if (document.getElementById('listbox').classList.contains('showingCan')) {
            canList.push(inputVal)
            apiPostItem('canList', inputVal)
        } else {
            cantList.push(inputVal)
            apiPostItem('cantList', inputVal)
        }
        addstyle()
    }
})
// Add a click event listener to the button

canBtn.addEventListener('click', () => {
    listBox.innerText = ''
    listContainer = document.createElement('div')
    listContainer.classList.add('text-container')
    listBox.append(listContainer)

    if (listBox.classList.contains('showingCant')) {
        //switching to showing can
        listBox.classList.replace('showingCant', 'showingCan')
        body.classList.replace('showingCant', 'showingCan')
        canBtn.innerText = "CAN'T"
        tagLine.innerText = 'I can still ...'
        canList.forEach(el => {
            const div = document.createElement('div')
            div.innerText = el
            document.querySelector('.text-container').appendChild(div)
        })
        addstyle()
    } else {
        //switching to showing can't
        listBox.classList.replace('showingCan', 'showingCant')
        body.classList.replace('showingCan', 'showingCant')

        canBtn.innerText = 'CAN'
        tagLine.innerText = 'I can no longer ...'

        cantList.forEach(el => {
            const div = document.createElement('div')
            div.innerText = el
            document.querySelector('.text-container').appendChild(div)
        })
        addstyle()
    }
})

// selects location and color for each list item to be animated
function addstyle() {
    const randomIntegerInRange = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min
    //const parentElement = document.getElementById('List')
    // const listItems = parentElement.children
    const listItems = document.querySelectorAll('.text-container div')
    listItems.forEach((item, index) => {
        item.style.left = randomIntegerInRange(10, 75) + 'vw'
        item.style.top = randomIntegerInRange(15, 65) + 'vh'
        item.style.animationDelay = index * 0.4 + 's'
        item.style.color = '#' + Math.random().toString(16).slice(-6)
    })
}
//
async function apiPostItem(list, item) {

    fetch(`${baseUrl}append`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listId: list,
            line: item
        })
    })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error:', error))
}

 document.onload = () => {
    listBox.innerText = ''
    listContainer = document.createElement('div')
    listContainer.classList.add('text-container')
    listBox.append(listContainer)
    cantList.forEach(el => {
        const div = document.createElement('div')
        div.innerText = el
        document.querySelector('.text-container').appendChild(div)
    })
    addstyle()

}
canBtn.click()
canBtn.click()