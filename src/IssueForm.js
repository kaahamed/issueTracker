import { Form, Row, Col, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { toast } from "react-toastify"
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "./formInputs/TextInput"
import DateInput from "./formInputs/DateInput"
import CheckInput from "./formInputs/CheckInput"
const defaultIssue = {
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'low',
    status: 'new',
    completedPercentage: '1'
}
const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
    const [issue, setIssue] = useState({
        title: '',
        subTitle: '',
        assignedTo: '',
        startDate: new Date(),
        endDate: new Date(),
        priority: 'low',
        status: 'new',
        completedPercentage: '1'
    })
    useEffect(() => {
        if (issueToEdit) {
            const {
                id,
                title,
                subTitle,
                assignedTo,
                startDate,
                endDate,
                priority,
                status,
                completedPercentage
            } = issueToEdit

            setIssue({
                id,
                title,
                subTitle,
                assignedTo,
                startDate,
                endDate,
                priority,
                status,
                completedPercentage
            })
        }


    }, [issueToEdit])
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        title: '',
        subTitle: '',
        assignedTo: '',
        startDate: '',
        endDate: ''
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
        const { title, subTitle,assignedTo,startDate,endDate } = issue
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
        const isValid = Object.values(issue).every((elm) => elm)

        if (issue.id && isValid) {
            updateIssue({
                ...issue,
            })
            toast.success('Issues is updated successfully')
            
            return navigate('/issues')
        }

        if (isValid) {
            addIssue({
                ...issue,
                id: uuid(),
            })
            toast.success('Issues is added successfully')
            navigate('/issues')
            // setIssue(defaultIssue)
        }
    }
    const { title, subTitle, assignedTo, startDate, endDate, priority, status, completedPercentage } = issue
    const { title: errorTitle, subTitle: errorSubTitle, assignedTo: errorAssignedTo, startDate: errorStartDate, endDate: errorEndDate } = errors
    return (
        <>
            <h1 className="mb-4 mt-4">{issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
            <Form onSubmit={handleSubmit}>

                <TextInput
                    label='Title'
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={title}
                    placeholder='Enter your task name'
                    error={errorTitle}
                />
                <TextInput
                    label='subTitle'
                    type='text'
                    name='subTitle'
                    onChange={handleChange}
                    value={subTitle}
                    placeholder='Enter your task details'
                    error={errorSubTitle}
                    as='textarea'
                />
                <TextInput
                    label='Assigned To'
                    type='text'
                    name='assignedTo'
                    onChange={handleChange}
                    value={assignedTo}
                    placeholder='Enter name whom you have assigned to'
                    error={errorAssignedTo}
                />

                <Form.Group as={Row} className='mb-3'>
                    <Col sm={3}>
                        <Form.Label htmlFor="startDate" column>Start Date</Form.Label>
                    </Col>
                    <Col sm={3}>
                        <DateInput
                            selected={startDate}
                            onChange={(date) => setIssue({
                                ...issue,
                                startDate: date
                            })}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            name='startDate'
                            value={startDate}
                            error={errorStartDate}
                            selectsStart
                        />
                    </Col>

                    {/* end date  */}
                    <Col sm={6}>
                        <Row>
                            <Col sm={3}>
                                <Form.Label htmlFor="endDate" column>End Date</Form.Label>
                            </Col>
                            <Col sm={6}>

                                <DateInput
                                    selected={endDate}
                                    onChange={(date) => setIssue({
                                        ...issue,
                                        startDate: date
                                    })}
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                    name='endDate'
                                    value={endDate}
                                    error={errorEndDate}
                                    selectsEnd
                                />
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
                        <CheckInput
                            name='priority'
                            label='low'
                            value='low'
                            onChange={handleChange}
                            valueToCheck={priority}

                        />
                        <CheckInput
                            name='priority'
                            label='medium'
                            value='medium'
                            onChange={handleChange}
                            valueToCheck={priority}

                        />
                        <CheckInput
                            name='priority'
                            label='high'
                            value='high'
                            onChange={handleChange}
                            valueToCheck={priority}

                        />
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
                        <CheckInput
                            name='status'
                            label='New'
                            value='new'
                            onChange={handleChange}
                            valueToCheck={status}

                        />
                        <CheckInput
                            name='status'
                            label='In Progress'
                            value='inProgress'
                            onChange={handleChange}
                            valueToCheck={status}

                        />
                        <CheckInput
                            name='status'
                            label='Completed'
                            value='completed'
                            onChange={handleChange}
                            valueToCheck={status}
                        />
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
                    {issueToEdit ? 'Update Issue' : 'Submit issue'}
                </Button>
            </Form>
        </>
    )
}

export default IssueForm