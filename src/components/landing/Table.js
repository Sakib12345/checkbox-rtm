import React, { useState, useEffect } from 'react';

const Table = () => {

    const [rowDto, setRowDto] = useState([]);
    const [billSubmitBtn, setBillSubmitBtn] = useState(true);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setRowDto(data))
    }, []);

    // All item select
    const allGridCheck = (value) => {
        const modifyGridData = rowDto?.map((itm) => ({
            ...itm,
            itemCheck: value,
        }));
        setRowDto(modifyGridData);
        // btn hide conditon
        const billSubmitBtn = modifyGridData.some((itm) => itm?.itemCheck === true);
        if (billSubmitBtn) {
            setBillSubmitBtn(false);
        } else {
            setBillSubmitBtn(true);
        }
    };

    const itemSelectedHandler = (value, index) => {
        const copyRowDto = [...rowDto];
        copyRowDto[index].itemCheck = !copyRowDto[index].itemCheck;
        setRowDto(copyRowDto);
        // btn hide conditon
        const bllSubmitBtn = copyRowDto.some((itm) => itm?.itemCheck === true);
        if (bllSubmitBtn) {
            setBillSubmitBtn(false);
        } else {
            setBillSubmitBtn(true);
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "15px", height: "15px" }}>
                            <input
                                style={{ margin: "5px" }}
                                type="checkbox"
                                id="parent"
                                onChange={(event) => {
                                    allGridCheck(event.target.checked);
                                }}
                            />
                        </th>
                        <th scope="col">sl</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {rowDto.map((item, index) => (
                        <tr>
                            <td className="tdSL">
                                <input
                                    id="itemCheck"
                                    type="checkbox"
                                    style={{ width: "15px", height: "15px" }}
                                    className=""
                                    value={item?.itemCheck}
                                    checked={item?.itemCheck}
                                    name={item?.itemCheck}
                                    onChange={(e) => {
                                        itemSelectedHandler(e.target.checked, index);
                                    }}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item?.title}</td>
                            <td>{item?.body}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default Table;