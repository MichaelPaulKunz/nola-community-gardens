import React from 'react'

interface Props {
  day: string
}

const DayHeading = (props: Props) => {
  const { day } = props;
  return (
    <div className="day-label">{day}</div>
  )
}

export default DayHeading