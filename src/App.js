
import AddIssue from './AddIssue';
import Issues from './Issues';
import Navigation from './Navigation';
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home';
import Notfound from './NotFound';
import EditIssue from './EditIssue';

function App() {
  const [issues, setIssues] = useState([{
    id: 'e8225999-876a-4bb2-a4c3-a5c43507b0f2',
    title: 'sample Title',
    subTitle: 'Task details',
    assignedTo: 'Adnan',
    startDate: '',
    endDate: '',
    priority: 'low',
    status: 'new',
    completedPercentage: '1'
  }])
  const [totalCount, setTotalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const addIssue = (issue) => {
    setIssues([...issues, issue])

    setTotalCount(prevCount => prevCount + 1)

    if (issue.status === 'new') {
      setNewCount(prevCount => prevCount + 1)
    }
    if (issue.status === 'inProgress') {
      setProgressCount(prevCount => prevCount + 1)
    }
    if (issue.status === 'completed') {
      setCompletedCount(prevCount => prevCount + 1)
    }
  }

  const updateIssue = (issueToUpdate)=>{
     const issuesAfterUpdate = issues.map(issue=>{
        if(issue.id === issueToUpdate.id){
          return {
            ...issueToUpdate,
            id:issue.id,
            status:issueToUpdate.completedPercentage < 100 ? 'inProgress': issueToUpdate.status,
          }
        }else{
          return issue
        }
      })
      
      setIssues(issuesAfterUpdate)
  }

  const deleteIssue = (id) => {
    const issuesAfterDelete = issues.filter(issue => issue.id !== id)
    setIssues(issuesAfterDelete)
  }

  const completeIssue = (id) => {
    const issuesAfterCompletion = issues.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          status: 'completed',
          completedPercentage: 100
        }
      } else {
        return issue
      }
    })
    setIssues(issuesAfterCompletion)
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Row>
        <BrowserRouter>
        <Navigation />
        <Col sm={{ span: 10, offset: 2 }}>
          <Container>
            <Routes>
              <Route path='/' index element={<Home />}/>
              <Route path='/add' element={<AddIssue addIssue={addIssue} />}/>
              <Route path='/edit/:id' element={<EditIssue issues={issues} updateIssue={updateIssue}/>}/>
              <Route path='/issues' element={<Issues
              issues={issues}
              totalCount={totalCount}
              newCount={newCount}
              progressCount={progressCount}
              completedCount={completedCount}
              completeIssue={completeIssue}
              deleteIssue={deleteIssue}
            />}/>
            <Route path='*' element={<Notfound />} />
            </Routes>
          </Container>
        </Col>
        </BrowserRouter>
      </Row>
    </>
  );
}

export default App;
