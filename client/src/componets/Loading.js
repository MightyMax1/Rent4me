import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {

    return (
        <div className="text-center mt-5">
            <h2>Loading...</h2>
            <Spinner animation="border" role="status" size="xl">
            </Spinner>
        </div>
    )
}

export default Loading;