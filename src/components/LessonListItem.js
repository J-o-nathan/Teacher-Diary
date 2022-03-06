import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import moment from 'moment';

const LessonListItem = ({ id, period, year, note, createdAt }) => {

  const [isHover, setIsHover] = useState(false)
// Destructure the onbject passed in (which is the individual expense)


// If you hover for 1 second without moving away then isHover state => true
// When isHover = true you can render new things and use dynamic css classNames

let timer

const onMouseOver = () => {
  timer = setTimeout(() => {
    setIsHover(() => true)
    console.log(isHover)
  }, 1000)  
}

const onMouseOut = () => {
  clearTimeout(timer)
  setIsHover(() => false)
  console.log(isHover)
}


  return (
  <Link className="list-item" to={`/edit/${id}`}>
    <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <h3 className={`list-item__title ${isHover ? 'active-hover' : ''}`}>Period: {period}</h3>
      <span className={`list-item__sub-title ${isHover ? 'active-hover' : ''}`}>{moment(createdAt).format('MMMM Do, YYYY')}</span>
      <span id="show-for-mobile" className="list-item__data">Year {year}</span>
    </div>
    <h3 id="show-for-desktop" className={`list-item__data ${isHover ? 'active-hover' : ''}`}>Year {year}</h3>

{/* Create a portal to render when isHover = true */}

    {isHover && ReactDOM.createPortal(
        <div id="dynamic-container"><h2 id="dynamic-heading">Lesson Notes</h2><p id="dynamic-note">"{note}"</p></div>,
        document.getElementById('portal')
      )}
  </Link>
)
}

export default LessonListItem;
