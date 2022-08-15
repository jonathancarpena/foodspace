import { cloneElement, useState, Children } from "react";


export const TabHeader = ({ children, openTab, setOpenTab, idx, bg = "bg-neutral-500", text = "text-neutral-500" }) => {

    return (
        <a
            className={"text-lg font-bold uppercase px-5 py-3 shadow-lg rounded leading-normal " +
                (openTab === idx
                    ? `${bg} text-white`
                    : `${text} bg-white`)
            }
            onClick={e => {
                e.preventDefault();
                setOpenTab(idx);
            }}
            data-toggle="tab"
            href={`#link${idx}`}
            role="tablist"
        >
            {children}
        </a>

    )
}

export const TabContent = ({ children }) => {

    return (
        <>
            {children}
        </>
    )
}


export default function Tabs({ children }) {
    const [openTab, setOpenTab] = useState(0);

    const tabContent = []
    const tabHeader = []
    Children.map(children, (child, idx) => {
        if (child.type.name === "TabHeader") {
            tabHeader.push(child)
        }

        if (child.type.name === "TabContent") {
            tabContent.push(child)
        }
    })

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    {/* TAB HEADER: CONTAINER */}
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {tabHeader.map((child, idx) => {
                            return (
                                <li key={`tabHeader-${idx}`} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    {cloneElement(child, { idx, openTab, setOpenTab })}
                                </li>
                            )

                        })}
                    </ul>


                    {/* TAB CONTENT: CONTAINER */}
                    <div>
                        {tabContent.map((child, idx) => {
                            return (
                                <div key={`tabContent-${idx}`} className={`${idx === openTab ? "block" : "hidden"}`} id={`link${idx}`}>
                                    {cloneElement(child, { idx, openTab })}
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    );
};

