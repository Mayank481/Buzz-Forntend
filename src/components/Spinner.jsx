import React from 'react'

export default function Spinner() {
    return (
        <div className="spinner-border text-dark position-absolute start-50" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
