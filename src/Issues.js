import { Table } from "react-bootstrap"
import IssueBar from "./IssueBar"

import Issue from "./Issue"

const Issues = ({ issues, totalCount, newCount, progressCount, completedCount, completeIssue, deleteIssue }) => {
    return (
        <>
        <h1>All Issues....</h1>

        <IssueBar
          totalCount={totalCount}
          newCount={newCount}
          progressCount={progressCount}
          completedCount={completedCount}
          />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {issues.map(issue=> <Issue 
                key={issue.id}
                issue={issue}
                completeIssue={completeIssue}
                deleteIssue={deleteIssue}
                />)}
            </tbody>
        </Table>
        </>
    )
}

export default Issues
