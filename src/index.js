import './styles.css'
import createNote from './modules/createNote'
import btnSearch from './modules/buttons'


const noteList = []


const btnDateToday = document.querySelector('.dateToday')
const btnDateWeek = document.querySelector('.dateWeek')


btnSearch(noteList)
createNote(noteList)