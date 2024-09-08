import {useState} from "react";



const Calendar = (props) => {
    const localDate = new Date();
    const initialMonth = (localDate.getMonth() + 1).toString().padStart(2, '0');
    

    const [month, setMonth] = useState(initialMonth);

    const getDate = (e) => {
        const selectedDate = e.target.value; 
        const [year, month, day] = selectedDate.split('-');
        setMonth(month); 
        props.fun(month)
    }

    return (
        <div className="calendar__container">
            <input type="date" onChange={getDate} />
            <p>Выбранный месяц: {month}</p>
        </div>
    );
}

export default Calendar;