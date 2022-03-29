import IssueForm from "./IssueForm"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
const EditIssue = ({issues, updateIssue})=>{
    const [issue, setIssue] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()
    const issueToEdit = ()=>{
        const foundIssue = issues.find((issue) => issue.id === id)
        if(!foundIssue){
            toast.warn('Issue is not found to be updated')
            return navigate('/issues')
        }
        setIssue(foundIssue)
    }
    useEffect(()=>{
        issueToEdit()
    }, [id])

    const handleUpdateIssue = (issue)=>{
            updateIssue(issue)
    }
    return(
        <IssueForm updateIssue={handleUpdateIssue} issue={issue}/>
    )
}

export default EditIssue