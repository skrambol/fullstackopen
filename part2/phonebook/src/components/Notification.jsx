const Notification = ({notification}) => {
  const {message, severity} = notification

  if (message === null) {
    return null
  }

  return (
    <div className={severity}>
      {message}
    </div>
  )
}

export default Notification
