/* eslint-disable react/prop-types */

const ModalHeading = (props) => {
    return (
        <div className={`shadow-md rounded-md ${props.shadow}`}>
            {props.title !== "" &&
                <div className={`${props.classname} rounded-t-md bg-mainBlueColor w-full py-6 border border-slate-600 font-semibold text-black`}>
                    <h1 className={` text-[20px] tracking-wider  ml-8 uppercase`}>{props.title}</h1>
                </div>}
            {props.desc !== "" && <div className={`${props.classname}  text-[15px] tracking-wider  ml-4 font-semibold uppercase`}>{props.desc}</div>}
        </div>
    );
};


export default ModalHeading;