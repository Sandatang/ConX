/* eslint-disable react/prop-types */

const ModalHeading = (props) => {
    return (
        <div className={`flex flex-col shadow-md ${props.shadow} sticky top-0 bg-white z-50 `}>
            <div className="flex flex-row">

                {props.title !== "" &&
                    <div className={`${props.classname}  bg-mainBlueColor w-full py-6 border-slate-600 font-semibold text-black`}>
                        <h1 className={` text-[20px] tracking-wider  ml-8 uppercase ${props.class}`}>{props.title}</h1>
                    </div>}
                <div className="px-2">
                    <button
                        className={`text-red-400 hover:text-red-700 text-2xl cursor-pointer z-50`}
                        onClick={props.onDismiss}
                    >
                        &times;
                    </button>
                </div>
            </div>
            {props.desc !== "" && <div className={`${props.classname}  text-md tracking-wider  ml-4 font-medium uppercase`}>{props.desc}</div>}

        </div>
    );
};


export default ModalHeading;