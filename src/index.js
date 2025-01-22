import './styles.css'
import { sideButtons, updateProjectList } from './modules/createNote'
import btnSearch from './modules/buttons'

const noteList = []
const projects = ['default']
const selectProject = document.querySelector('#searchProject')

updateProjectList(selectProject, projects, true)
btnSearch(noteList, projects)
sideButtons(noteList, projects)