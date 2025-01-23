import './styles.css'
import { sideButtons, updateProjectList } from './modules/createNote'
import btnSearch from './modules/buttons'
import { renderAll } from './modules/renderNote'

const noteList = JSON.parse(localStorage.getItem('noteList')) || []
const projects = JSON.parse(localStorage.getItem('projects')) || ['default']
const selectProject = document.querySelector('#searchProject')


updateProjectList(selectProject, projects, true)
btnSearch(noteList, projects)
sideButtons(noteList, projects)
renderAll(noteList, projects)