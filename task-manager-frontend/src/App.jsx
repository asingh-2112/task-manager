import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [desc, setDesc] = useState('')

  useEffect(() => fetchTasks(), [])

  function fetchTasks() {
    axios.get(API).then(res => setTasks(res.data))
  }

  function addTask() {
    if (desc.trim()) {
      axios.post(API, { description: desc })
        .then(() => { setDesc(''); fetchTasks() })
    }
  }

  function toggle(id) {
    axios.put(`${API}/${id}`)
      .then(() => fetchTasks())
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Task Manager</h2>
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Task"/>
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <label style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
              {t.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
