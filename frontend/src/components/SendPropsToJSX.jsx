/* eslint-disable react/prop-types */
const SendPropsToJSX = (props) => {
    const ReceiverComponent = props.receiver
  return <ReceiverComponent {...props}/>
}

export default SendPropsToJSX