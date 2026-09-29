import { useMemo, useState } from 'react'
import './App.css'

const students = [
  {
    name: 'Aarav Mehta',
    rollNumber: 'CS2024-018',
    department: 'Computer Science',
    semester: 4,
    cgpa: 9.42,
  },
  {
    name: 'Ananya Iyer',
    rollNumber: 'EC2023-041',
    department: 'Electronics',
    semester: 6,
    cgpa: 9.18,
  },
  {
    name: 'Kabir Shah',
    rollNumber: 'ME2024-027',
    department: 'Mechanical',
    semester: 4,
    cgpa: 8.76,
  },
  {
    name: 'Diya Nair',
    rollNumber: 'CS2022-006',
    department: 'Computer Science',
    semester: 8,
    cgpa: 9.67,
  },
  {
    name: 'Rohan Das',
    rollNumber: 'CE2023-033',
    department: 'Civil Engineering',
    semester: 6,
    cgpa: 8.91,
  },
  {
    name: 'Mira Kapoor',
    rollNumber: 'EC2024-012',
    department: 'Electronics',
    semester: 4,
    cgpa: 9.31,
  },
]

function Header({ title, subtitle }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Campus directory home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>campus<span className="brand-light">/directory</span></span>
      </a>
      <div className="header-context">
        <span className="term-label">ACADEMIC YEAR 2024–25</span>
        <span className="header-divider" aria-hidden="true" />
        <span className="header-semester">Semester directory</span>
      </div>
      <div className="header-avatar" aria-label="Administrator">AD</div>
      <div className="page-heading" id="top">
        <p className="eyebrow">STUDENT RECORDS</p>
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
    </header>
  )
}

function StudentCard({ student }) {
  return (
    <article className="student-card">
      <div className="student-identity">
        <span className="student-initials" aria-hidden="true">
          {student.name.split(' ').map((part) => part[0]).join('')}
        </span>
        <div className="identity-copy">
          <h3>{student.name}</h3>
          <p>{student.rollNumber}</p>
        </div>
      </div>
      <div className="card-divider" />
      <div className="student-details">
        <div className="detail-row">
          <span>Department</span>
          <strong>{student.department}</strong>
        </div>
        <div className="detail-row">
          <span>Current semester</span>
          <strong>{student.semester}<small> / 8</small></strong>
        </div>
      </div>
      <div className="cgpa-panel">
        <span>CGPA</span>
        <strong>{student.cgpa.toFixed(2)}<small> / 10</small></strong>
      </div>
    </article>
  )
}

function StudentList({ students: studentRecords }) {
  return (
    <div className="student-grid" aria-live="polite">
      {studentRecords.map((student) => (
        <StudentCard key={student.rollNumber} student={student} />
      ))}
    </div>
  )
}

function Footer({ studentCount, academicYear }) {
  return (
    <footer className="site-footer">
      <span>© {academicYear} Campus Directory</span>
      <span><strong>{studentCount}</strong> student records</span>
      <span className="footer-status"><span />All records up to date</span>
    </footer>
  )
}

function App() {
  const [sortOrder, setSortOrder] = useState('high-to-low')
  const sortedStudents = useMemo(() => [...students].sort((first, second) => (
    sortOrder === 'high-to-low'
      ? second.cgpa - first.cgpa
      : first.cgpa - second.cgpa
  )), [sortOrder])

  return (
    <div className="app-shell">
      <Header
        title="Student directory"
        subtitle="Academic records across departments."
      />
      <main className="directory-content">
        <section className="directory-toolbar" aria-label="Student directory controls">
          <div>
            <h2>All students <span>{students.length}</span></h2>
            <p>Browse academic profiles across departments</p>
          </div>
          <label className="sort-control">
            <span>Sort by CGPA</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="high-to-low">Highest first</option>
              <option value="low-to-high">Lowest first</option>
            </select>
          </label>
        </section>
        <StudentList students={sortedStudents} />
      </main>
      <Footer studentCount={students.length} academicYear="2024–25" />
    </div>
  )
}

export default App
