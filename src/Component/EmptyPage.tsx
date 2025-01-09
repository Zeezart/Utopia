import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function EmptyPage(props:any) {
  return (
    <div id="empty-page">
        <div className="empty-page">
            <FontAwesomeIcon icon={props.icon} className="icon"/>
            <h2>{props.mainMessage}</h2>
            <p>{props.detail}</p>
        </div>
    </div>
  )
}

export default EmptyPage