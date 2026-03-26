import './Men.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { DeleteMenDataAsync, filterData, GetAllMenAsync } from '../Services/Action/Action';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
const Men = () => {
    const { men } = useSelector(state => state);

    const [showCategory, setShowCategory] = useState(true);
    const [showBrand, setShowBrand] = useState(false);
    const { isError, isCreate } = useSelector(state => state);
    const [pattern, setPattern] = useState(false);
    const [Filter, setFilter] = useState({
        categories: [],
        Brand: [],
        pattern: []
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(DeleteMenDataAsync(id))
    }
    const handleEdit = (id) => {
        navigate(`/Edit/${id}`)
    }
    useEffect(() => {
        dispatch(GetAllMenAsync());
    }, [])
    const handlecategorychange = (type, value) => {
        setFilter((prev) => {
            const selected = prev[type];
            const alreadySelected = selected.includes(value);
            const updated = alreadySelected
                ? selected.filter((item) => item !== value)
                : [...selected, value];
            const newFilter = { ...prev, [type]: updated };
            dispatch(filterData(newFilter));
            return newFilter;
        });


    }

    const handleclearAll = () => {
        setFilter({
            categories: [],
            Brand: [],
            pattern: []
        });
        dispatch(filterData({
            categories: [],
            Brand: [],
            pattern: []
        }));

    };



    return (
        <>
            <br></br>
            <section className='mens-section'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <div className="sidebar p-3 border rounded">

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className="mb-0" style={{ fontSize: "1.3rem", color: "gray" }}>
                                        FILTERS
                                    </p>
                                    <button className="border-1 rounded-2 px-3 py-1" onClick={handleclearAll}>CLEAR ALL</button>
                                </div>
                                <hr />
                                <div className="price d-flex justify-content-between mb-3">
                                    <div>
                                        <span style={{ color: "grey" }}>Min.Amount</span>
                                        <input
                                            type="number"
                                            min={100}
                                            placeholder="100"
                                            style={{
                                                width: "100px",
                                                border: "1px solid grey",
                                                padding: "5px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ color: "grey" }}>Max.Amount</span>
                                        <input
                                            type="number"
                                            max={5000}
                                            placeholder="5000"
                                            style={{
                                                width: "100px",
                                                border: "1px solid grey",
                                                padding: "5px",
                                                borderRadius: "5px",
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setShowCategory(!showCategory)}
                                    >
                                        <h6 className="mb-0">Category Type</h6>
                                        <IoChevronDownSharp
                                            style={{
                                                transform: showCategory ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s ease",
                                                fontSize: "1.1rem",
                                                color: "black",
                                            }}
                                        />
                                    </div>

                                    {showCategory && (
                                        <div className="mt-2 ps-2">
                                            {[
                                                ["Blazers"],
                                                ["Cargos"],
                                                ["Chinos"],
                                                ["Jackets"],
                                                ["Jeans"],
                                                ["Joggers"],
                                            ].map(([name]) => (
                                                <div key={name} className="d-flex justify-content-between">
                                                    <label>
                                                        <input type="checkbox" className="me-2" onChange={() => handlecategorychange('categories', name)} checked={Filter.categories.includes(name)} /> {name}

                                                    </label>

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>


                                <div>
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setShowBrand(!showBrand)}
                                    >
                                        <h6 className="mb-0">Brand</h6>
                                        <IoChevronDownSharp
                                            style={{
                                                transform: showBrand ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s ease",
                                                fontSize: "1.1rem",
                                                color: "gray",
                                            }}
                                        />
                                    </div>

                                    {showBrand && (
                                        <div className="mt-2 ps-2">
                                            {[
                                                ["AD by Arvind"],
                                                ["Arrow"],
                                                ["Arrow Newyork"],
                                                ["Arrow Sport"],
                                                ["Calvin Klein"],
                                                ["Calvin Klein Jeans"],
                                            ].map(([name]) => (
                                                <div key={name} className="d-flex justify-content-between">
                                                    <label>
                                                        <input type="checkbox" className="me-2" onChange={() => handlecategorychange('Brand', name)} checked={Filter.Brand.includes(name)} /> {name}
                                                    </label>

                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div onClick={() => setPattern(!pattern)} className='d-flex justify-content-between align-items-center'>
                                        <h6 className="mb-0">pattern</h6>
                                        <IoChevronDownSharp
                                            style={{
                                                transform: pattern ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s ease",
                                                fontSize: "1.1rem",
                                                color: "black",
                                            }}
                                        />
                                    </div>
                                    {
                                        pattern && (
                                            <div className="mt-2 ps-2">
                                                {["Fabric Decoration", "solid", "textured", "washed"].map((name) => {
                                                    return (
                                                        <>
                                                            <div key={name} className="d-flex justify-content-between">
                                                                <label>
                                                                    <input type="checkbox" className="me-2" onChange={() => handlecategorychange('pattern', name)} checked={Filter.pattern.includes(name)} /> {name}
                                                                </label>

                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {isError ? <h1> {isError} </h1> : ""}
                        <div className="col-8 p-0">
                            <div className='men-card'>
                                <div className='row'>
                                    {men && men.length > 0 ?
                                        men?.map((v) => {
                                            return (
                                                <>
                                                    <div className='col-4'>
                                                        <div className='mens-card'>
                                                            <div className='men-card-image'>
                                                                <img src={v.image} ></img>
                                                            </div>
                                                            <div className='men-card-content p-2'>
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                    <p className='mb-0'>{v.name}</p>
                                                                    <CiHeart style={{ fontSize: "1.4rem" }} />
                                                                </div>
                                                                <p className='mb-0' style={{ color: "grey", fontSize: "1.1rem" }}>{v.desc}</p>
                                                                <p className='mb-0' style={{ color: "black", fontSize: "1.1rem" }}>₹ {v.price}</p>



                                                                <div className='d-flex gap-2'>
                                                                    <MdDelete className='Delete-button' onClick={() => handleDelete(v.id)} />
                                                                    <FaRegEdit className='Edit-button' onClick={() => handleEdit(v.id)} />
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) :
                                        <p>Not Data Found </p>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Men;