import { makeStudentPage } from './factories/application/pages/student'
import '@/application/styles/global.scss'

import ReactDOM from 'react-dom'
import React from 'react'
import 'bootstrap'

const StudentPage = makeStudentPage

ReactDOM.render(
  <StudentPage/>,
  document.getElementById('root')
)
