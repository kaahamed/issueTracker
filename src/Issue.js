import { FaEdit, FaTrashAlt, FaCheckSquare } from 'react-icons/fa'
import { Badge, ProgressBar, Modal, Button } from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Issue = ({ issue, completeIssue, deleteIssue }) => {
    const { id, title, priority, status, endDate, assignedTo, completedPercentage } = issue
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClose = (evt) =>{
        if(evt.target.dataset.action === 'delete'){
            deleteIssue(id)
            toast.success('Issue is deleted successfully')
        }
        setShow(false)
    }
    const handleShow = () => setShow(true)
    const lowClass = priority === 'low' ? 'primary' : ''
    const highClass = priority === 'high' ? 'danger' : ''
    const mediumClass = priority === 'medium' ? 'info' : ''
    const lowPercentageClass = completedPercentage < 30 ? 'danger' : ''
    const highPercentageClass = completedPercentage >= 70 ? 'success' : ''
    const mediumPercentageClass = completedPercentage > 30 && completedPercentage < 70 ? 'info' : ''

    const modal = <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete the Issue</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" data-action='delete' onClick={handleClose}>
                Delete
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
    return (
        <>
        {modal}
        <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>
                <Badge bg={`${lowClass}${highClass}${mediumClass}`} pill>{priority}</Badge>
            </td>
            <td>{status}</td>
            <td>{assignedTo}</td>
            <td>{endDate}</td>
            <td>
                <ProgressBar
                    variant={`${lowPercentageClass}${highPercentageClass}${mediumPercentageClass}`}
                    label={completedPercentage}
                    now={completedPercentage}
                    striped
                    animated
                />
            </td>
            <td className="d-flex justify-content-between">
                <FaEdit className="text-info" onClick={()=>navigate(`/edit/${id}`)}/>
                <FaCheckSquare className="text-success" onClick={() => completeIssue(id)} />
                <FaTrashAlt className="text-danger" onClick={handleShow} />
            </td>
        </tr>
        </>
    )
}

export default Issue;
