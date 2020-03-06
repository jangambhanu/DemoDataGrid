import React from 'react'

export const CheckboxNew = props => {
    return (
        <div>
            <input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </div>
    )
}

export default CheckboxNew
