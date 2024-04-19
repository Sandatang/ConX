/* eslint-disable react/prop-types */
const Modal = ({ heading, children, width, height }) => {
    return (
        <div className={` fixed bg-black/70 inset-0 flex items-center justify-center z-50 `}>
            <div className={` ${width} bg-white rounded-md w-11/12 md:max-w-[45rem] mx-auto shadow-lg z-50 ${height} overflow-y-auto `}>
                {heading}
                <div className=" py-4 text-left px-6">
                    {/* <div className="flex justify-end">
                        <button
                            className={`text-red-400 hover:text-red-700  text-2xl cursor-pointer z-50`}
                            onClick={onDismiss}
                        >
                            &times;
                        </button>
                    </div> */}

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;