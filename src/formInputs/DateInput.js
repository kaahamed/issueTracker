import DatePicker from 'react-datepicker'
import { Form } from 'react-bootstrap'
const DateInput = ({selected, onChange,name, minDate,value,error,startDate,endDate,...rest}) => {
    return (
        <>
            <DatePicker
                type="date"
                selected={selected}
                onChange={onchange}
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                name={name}
                value={value}
                isInvalid={error}
                {...rest}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
                {error}
            </Form.Control.Feedback>
        </>
    )
}
export default DateInput