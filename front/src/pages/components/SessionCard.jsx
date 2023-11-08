import PropTypes from 'prop-types';

function SessionCard({ session, onJoin, onQuit, hasJoined }) {
    return (
      <div className="session-card">
        <h3>{session.courseNumber}</h3>
        <p>{session.description}</p>
        <p>{`Start Time: ${session.startTime}`}</p>
        <p>{`End Time: ${session.endTime}`}</p>
        {hasJoined ? (
          <button onClick={onQuit}>Quit</button>
        ) : (
          <button onClick={onJoin}>Join</button>
        )}
      </div>
    );
  }

  SessionCard.propTypes = {
    session: PropTypes.object.isRequired,
    onJoin: PropTypes.func.isRequired,
    onQuit: PropTypes.func.isRequired,
    hasJoined: PropTypes.bool.isRequired
  };
  
  export default SessionCard;
  