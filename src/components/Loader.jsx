import './Loader.css'

function Loader({ message = 'Loading movies…' }) {
  return (
    <div className="loader" role="status" aria-live="polite" aria-busy="true">
      <div className="loader__spinner" aria-hidden="true" />
      <p className="loader__message">{message}</p>
    </div>
  )
}

export default Loader
