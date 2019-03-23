import React from 'react'

function Park(props) {
    return (
        <div>
            <input type="text" name='name' value={props.park.name} />
            <input type="text" name='neighborhood' value={props.park.neighborhood} />
            <input type="text" name='image' value={props.park.image} />
            <input type="checkbox" name='playground' value={props.park.playground}/>
            <input type="checkbox" name='dogs' value={props.park.dogs}/>
            <button onClick={() => props.deletePark(props.park)}>Delete Park</button>
        </div>
    )
}

export default Park