const newList = document.getElementById("listList")
const textInput = document.getElementById("addTodoList")
const newListBtn = document.getElementById("listAddBtn")
const delListBtn = document.getElementById("listRemoveBtn")
const list = document.querySelector("ul")
const itemList = document.getElementById("itemList")

function refreshItems(){
    try {
        itemList.childNodes.forEach(element => {
            if (element.classList.contains(newList.value)) {
                element.classList.remove("none")
            } else {
                element.classList.add("none")       
            }     
        });    
    } catch (error) {}
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
        }
        textInput.value = "";
        newList.options[0].selected = true;
        refreshItems()
    }
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
        }
    
    })

    input.addEventListener("click", e => {
        if (input.readOnly === true) {
            input.classList.toggle("completed")
            input.blur()
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
    })

    e.preventDefault()
})

delListBtn.addEventListener("click", e => {
    if (newList.value === "-- Create New List --" || newList.value === "Default") {
        e.preventDefault()
    } else {
        newList.removeChild(newList.children[newList.selectedIndex])
    }
})