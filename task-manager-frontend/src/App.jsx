import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_API = `${import.meta.env.VITE_REACT_APP_API_URL}/tasks`

export default function App() {
  const [tasks, setTasks] = useState([])
  const [desc, setDesc] = useState('')

  // Initial load using regular fetch
  useEffect(() => {
    fetchTasks()
  }, [])

  function fetchTasks() {
    axios.get(BASE_API).then(res => setTasks(res.data))
  }

  function fetchExtractedTasks() {
    axios.get(`${BASE_API}/extract`).then(res => setTasks(res.data))
  }

  function addTask() {
    if (desc.trim()) {
      axios.post(BASE_API, { description: desc })
        .then(() => {
          setDesc('')
          fetchTasks()
        })
    }
  }

  function toggle(id) {
    axios.put(`${BASE_API}/${id}`)
      .then(() => fetchTasks())
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Task Manager</h2>
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Task" />
      <button onClick={addTask}>Add</button>
      <button onClick={fetchExtractedTasks} style={{ marginLeft: '1rem' }}>Extract Tasks</button>
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
