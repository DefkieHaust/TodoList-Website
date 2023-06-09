const newList = document.getElementById("listList")
const textInput = document.getElementById("addTodoList")
const newListBtn = document.getElementById("listAddBtn")
const delListBtn = document.getElementById("listRemoveBtn")
const list = document.querySelector("ul")
const itemList = document.getElementById("itemList")

let srlObj = {Default: []}

function syncSrlObj() {
    try {
        srlObj[newList.value] = []
        itemList.childNodes.forEach(element => {
            if (element.classList.contains(newList.value)) {
                srlObj[newList.value].push(element.firstChild.value)
            }
        })
    } catch (error) {console.log(error)}
}

function refreshItems(){
    try {
        itemList.childNodes.forEach(element => {
            try {
                var contains = element.classList.contains(newList.value)
            } catch (e) {
                var contains = null
            }
            if (contains === true) {
                element.classList.remove("none")
            } else if (contains === false) {
                element.classList.add("none")       
            }     
        });    
    } catch (error) {console.log(error)}
}

textInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        newList.style.display = "block";
        textInput.style.display = "none";
        newListBtn.style.display = "block";
        delListBtn.style.display = "block";
        if (textInput.value !== "") {
            newList.innerHTML = `<option>${textInput.value}</option>` + newList.innerHTML
            srlObj[textInput.value] = []
            localStorage.setItem("todoList", JSON.stringify(srlObj))
        }
        textInput.value = "";
        newList.options[0].selected = true;
        refreshItems()
    }
})

textInput.addEventListener("blur", e => {
    newList.style.display = "block";
    textInput.style.display = "none";
    newListBtn.style.display = "block";
    delListBtn.style.display = "block";
    textInput.value = "";
    newList.options[0].selected = true;
    refreshItems()
})

newList.addEventListener("change", e => {
    if (e.target.value === "-- Create New List --") {
        e.preventDefault()
        newList.style.display = "none";
        textInput.style.display = "block";
        newListBtn.style.display = "none";
        delListBtn.style.display = "none";
        textInput.style.borderTopRightRadius = "0.4rem"
        textInput.style.borderBottomRightRadius = "0.4rem"
        textInput.focus()
    } else {
        refreshItems()     
    }
})

newListBtn.addEventListener("click", e => {
    e.preventDefault()
    let li =  document.createElement("li")
    li.classList.add(newList.value)
    
    let input = document.createElement("input")
    input.type = "text"
    input.name = "todoList"
    input.id = "todoList"

    let button = document.createElement("button")
    button.classList.add("edit")
    button.type = "button"
    button.innerHTML = `<i class="fa-solid fa-pencil"></i>`

    let button2 = document.createElement("button")
    button2.classList.add("delete")
    button2.type = "button"
    button2.innerHTML = `<i class="fa-solid fa-trash"></i>`
    button2.style.display = "inline"

    li.append(input, button, button2)

    list.insertBefore(li, list.firstChild);

    input.focus()

    input.addEventListener("keydown", e => {
        if (e.key === "Enter" && input.value !== "") {
            e.preventDefault()
            button2.style.display = "none"
            button.style.display = "inline"
            input.readOnly = true
            input.blur()
            input.classList.remove("completed")

            syncSrlObj()

            localStorage.setItem("todoList", JSON.stringify(srlObj))
        }
    
    })

    input.addEventListener("click", e => {
        if (input.readOnly === true) {
            input.classList.toggle("completed")
            input.blur()

            if (input.classList.contains("completed")) {
                srlObj[newList.value][srlObj[newList.value].indexOf(input.value)] = `/${input.value}`
            } else {
                srlObj[newList.value][srlObj[newList.value].indexOf(`/${input.value}`)] = input.value
            }
            localStorage.setItem("todoList", JSON.stringify(srlObj))
        }
        
    })

    button.addEventListener("click", e => {
        input.readOnly = false
        input.focus()
        button.style.display = "none"
        button2.style.display = "inline"
    })

    button2.addEventListener("click", e => {
        list.removeChild(li)
        refreshItems()
        syncSrlObj()
        localStorage.setItem("todoList", JSON.stringify(srlObj))
    })

})

delListBtn.addEventListener("click", e => {
    if (newList.value === "-- Create New List --" || newList.value === "Default") {
        e.preventDefault()
    } else {
        delete srlObj[newList.value]
        newList.removeChild(newList.children[newList.selectedIndex])
        refreshItems()
        localStorage.setItem("todoList", JSON.stringify(srlObj))
    }
})

function populateList() {
    let localObj = JSON.parse(localStorage.getItem("todoList"))
    if (localObj) {
        srlObj = localObj
        for (const key in localObj) {

            if (key !== "Default") {
                newList.innerHTML = `<option>${key}</option>` + newList.innerHTML
            }

            for (const item of localObj[key]) {
                let li =  document.createElement("li")
                li.classList.add(key)

                let input = document.createElement("input")
                input.type = "text"
                input.name = "todoList"
                input.id = "todoList"
                input.readOnly = true

                if (item[0] === "/") {
                    input.classList.add("completed")
                    input.value = item.slice(1)
                } else {
                    input.value = item  
                }

                let button = document.createElement("button")
                button.classList.add("edit")
                button.type = "button"
                button.innerHTML = `<i class="fa-solid fa-pencil"></i>`
                button.style.display = "inline"

                let button2 = document.createElement("button")
                button2.classList.add("delete")
                button2.type = "button"
                button2.innerHTML = `<i class="fa-solid fa-trash"></i>`
                button2.style.display = "none"

                li.append(input, button, button2)

                list.appendChild(li);

                input.addEventListener("keydown", e => {
                    if (e.key === "Enter" && input.value !== "") {
                        e.preventDefault()
                        button2.style.display = "none"
                        button.style.display = "inline"
                        input.readOnly = true
                        input.blur()
                        input.classList.remove("completed")

                        syncSrlObj()

                        localStorage.setItem("todoList", JSON.stringify(srlObj))
                    }
                
                })

                input.addEventListener("click", e => {
                    if (input.readOnly === true) {
                        input.classList.toggle("completed")
                        input.blur()

                        if (input.classList.contains("completed")) {
                            srlObj[newList.value][srlObj[newList.value].indexOf(input.value)] = `/${input.value}`
                        } else {
                            srlObj[newList.value][srlObj[newList.value].indexOf(`/${input.value}`)] = input.value
                        }
                        localStorage.setItem("todoList", JSON.stringify(srlObj))
                        
                    } 
                    
                })

                button.addEventListener("click", e => {
                    input.readOnly = false
                    input.focus()
                    button.style.display = "none"
                    button2.style.display = "inline"
                })

                button2.addEventListener("click", e => {
                    list.removeChild(li)
                    refreshItems()
                    syncSrlObj()
                    localStorage.setItem("todoList", JSON.stringify(srlObj))
                })

            } 
        refreshItems()    
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
    populateList();
})