import { Form, Row, Col, Button } from "react-bootstrap"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"

const defaultIssue ={
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate:'',
    priority:'low',
    status:'new',
    completedPercentage:'1'
}
const AddIssue = ({addIssue}) => {
    const [issue, setIssue] = useState(defaultIssue)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        title: '',
        subTitle: '',
        assignedTo: '',
        errorStartDate: '',
        errorEndDate:''
    })
    const handleChange = (evt) => {
        setIssue({
            ...issue,
            [evt.target.name]: evt.target.value,
        })
        setErrors({
            ...errors,
            [evt.target.name]: ''
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const { title, subTitle } = issue
        if (title === '') {
            setErrors((prevError) => ({
                ...prevError,
                title: 'Title is required'
            }))
        }

        if (subTitle === '') {
            setErrors((prevError) => ({
                ...prevError,
                subTitle: 'Sub Title is required'
            }))
        }
        if (assignedTo === '') {
            setErrors((prevError) => ({
                ...prevError,
                assignedTo: 'assignedTo is required'
            }))
        }
        if (startDate === '') {
            setErrors((prevError) => ({
                ...prevError,
                startDate: 'Start Date is required'
            }))
        }

        if (endDate === '') {
            setErrors((prevError) => ({
                ...prevError,
                endDate: 'End Date is required'
            }))
        }
        const isValid = Object.values(issue).every(elm => elm)

        if (isValid) {
            addIssue({
                id:uuid(),
                ...issue,
            })
            toast.success('Issues is added successfully')
            navigate('/issues')
            // setIssue(defaultIssue)
        }
    }
    const { title, subTitle, assignedTo, startDate,endDate, priority, status, completedPercentage } = issue
    const { title: errorTitle, subTitle: errorSubTitle, assignedTo: errorAssignedTo, startDate: errorStartDate, endDate:errorEndDate } = errors
    return (
        <>
            <h1 className="mb-4 mt-4">Add Issue</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                        <Form.Label htmlFor="title" column>Title</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleChange}
                            value={title}
                            placeholder='Enter your task name'
                            isInvalid={errorTitle}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errorTitle}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                        <Form.Label htmlFor="subTitle" column>Sub Title</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Control
                            as='textarea'
                            type="text"
                            name="subTitle"
                            id="subTitle"
                            onChange={handleChange}
                            value={subTitle}
                            placeholder='Enter your task details'
                            isInvalid={errorSubTitle}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errorSubTitle}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                        <Form.Label htmlFor="assignedTo" column>Assigned To</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <Form.Control
                            as='textarea'
                            type="text"
                            name="assignedTo"
                            id="assignedTo"
                            onChange={handleChange}
                            value={assignedTo}
                            placeholder='Enter name whom you have assigned to'
                            isInvalid={errorAssignedTo}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errorAssignedTo}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                        <Form.Label htmlFor="startDate" column>Start Date</Form.Label>
                    </Col>
                    <Col sm={3}>
                        <Form.Control
                            type="date"
                            onChange={handleChange}
                            name='startDate'
                            value={startDate}
                            placeholder="Enter Start Date"
                            isInvalid={errorStartDate}
                        />
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errorStartDate}
                        </Form.Control.Feedback>
                    </Col>

                    {/* end date  */}
                    <Col sm={6}>
                        <Row>
                            <Col sm={3}>
                                <Form.Label htmlFor="endDate" column>End Date</Form.Label>
                            </Col>
                            <Col sm={6}>
                                <Form.Control
                                    type="date"
                                    onChange={handleChange}
                                    name='endDate'
                                    value={endDate}
                                    placeholder="Enter End Date"
                                    isInvalid={errorEndDate}
                                />
                                <Form.Control.Feedback type="invalid" className="d-block">
                                    {errorEndDate}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col sm={3}>
                            <Form.Label htmlFor="priority">
                                Priority
                            </Form.Label>
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='priority'
                        value='high'
                        label='High'
                        checked={priority === 'high'}
                        />
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='priority'
                        value='medium'
                        label='Medium'
                        checked={priority === 'medium'}
                        />
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='priority'
                        value='low'
                        label='Low'
                        checked={priority === 'low'}
                        />
                        </Col>
                    </Row>
                </Form.Group>
                {/* status start */}
                
                <Form.Group>
                    <Row>
                        <Col sm={3}>
                            <Form.Label htmlFor="status">
                                Status
                            </Form.Label>
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='status'
                        value='new'
                        label='New'
                        checked={status === 'new'}
                        />
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='status'
                        value='inProgress'
                        label='In Progress'
                        checked={status === 'inProgress'}
                        />
                        </Col>
                        <Col sm='auto'>
                        <Form.Check
                        type="radio"
                        onChange={handleChange}
                        name='status'
                        value='completed'
                        label='Completed'
                        checked={status === 'completed'}
                        />
                        </Col>
                    </Row>
                </Form.Group>

                {/* range start */}
                <Form.Group>
                    <Row>
                        <Col sm={3}>
                            <Form.Label htmlFor="completedPercentage" className="formRange" column>
                                Completed In Percentage
                            </Form.Label>
                        </Col>
                        <Col sm={6}>
                            <Form.Range 
                            value={completedPercentage}
                            name='completedPercentage'
                            onChange={handleChange}
                            />
                        </Col>
                        <Col sm={1}>{completedPercentage}</Col>
                    </Row>
                </Form.Group>

                <Button variant="primary" size='sm' type="submit">
                    Submit issue
                </Button>
            </Form>
        </>
    )
}

export default AddIssue
