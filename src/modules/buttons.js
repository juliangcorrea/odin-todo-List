import { renderByFilter, renderAll } from './renderNote'

/* Main Functions */

function searchByProject(mainArray, projectList){
    const btnProject = document.querySelector('.btnProject')
    const selectedItems = document.querySelector('#searchProject')
    btnProject.addEventListener('click', (e) => {
        e.preventDefault()
        const projectFilter = selectedItems.options[selectedItems.selectedIndex].value
        if(projectFilter){
            renderByFilter('project', `${projectFilter}`, mainArray, projectList)
        }
    })
}

function searchByPriority(mainArray, projectList){
    const btnPriority = document.querySelector('.priorities')
    const overlay = document.getElementById('overlay')
    btnPriority.addEventListener('click', () => {
        const priority = document.getElementById('priority-dialog')
        overlay.style.display = 'block';
        priority.showModal()
        const btnSearchPriority = priority.querySelector('#prioritySearch')
        btnSearchPriority.addEventListener('click', () => {
            const selectedRadio = priority.querySelector('input[name="choice"]:checked')
            if(selectedRadio){
                const searchFilter = selectedRadio.value
                renderByFilter('priority', `${searchFilter}`, mainArray, projectList)
                overlay.style.display = 'none'
                priority.close()
            }
        })
    })
    
}

function searchByDate(mainArray, projectList){
    const btnsDate = document.querySelectorAll('.date')
    btnsDate.forEach(element => {
        if(element.dataset.date == 'today'){
            const today = new Date();
            const dueDate = getDate(today, true)
            element.addEventListener('click', () => {
                renderByFilter('dueDate', dueDate, mainArray, projectList)
            })
        } else {
            element.addEventListener('click', () =>{ 
                const tempData = mainArray.filter(item => isDateThisWeek(getDate(new Date(item.dueDate))) == true)
                renderAll(tempData, projectList)
            })
        }
    });
}

function searchAll(mainArray, projectList){
    const btnAllNotes = document.querySelector('.allNotes')
    btnAllNotes.addEventListener('click', () => {
        renderAll(mainArray, projectList)
    })
}

function btnSearch(mainArray, projectList){
    searchByProject(mainArray, projectList)
    searchByPriority(mainArray, projectList)
    searchByDate(mainArray, projectList)
    searchAll(mainArray, projectList)
}


/* Auxiliary Functions */

function getDate(dateData, inverted = false){
    const day = String(dateData.getDate()).padStart(2, '0');
    const month = String(dateData.getMonth() + 1).padStart(2, '0');
    const year = dateData.getFullYear();
    if(inverted){
        return `${year}-${month}-${day}`
    }
    return `${day}/${month}/${year}`
}

function isDateThisWeek(dateString) {
    const [day, month, year] = dateString.split('/').map(num => parseInt(num, 10))
    const givenDate = new Date(year, month - 1, day)
    givenDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const currentDay = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay + 1)
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return givenDate >= startOfWeek && givenDate <= endOfWeek
}


export default btnSearch