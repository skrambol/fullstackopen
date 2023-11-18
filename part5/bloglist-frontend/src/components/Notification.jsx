import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) return null

  const { message, severity } = notification
  const textColor = severity === 'info' ? 'green' : 'red'

  return (
    <p style={{ color: textColor }}>
      {message}
    </p>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification
