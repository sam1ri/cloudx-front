
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import './ListRecipe.scss'

const ListRecipe = () => {

    const navigate = useNavigate();
    const [recepts, setRecepts] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/Login')
        }
        fetchData();
    }, []);

    const fetchData = () => {
        axiosInstance({
            method: 'GET',
            url: 'getRecepts'
        }).then(data => {
            setRecepts(data.data);
        })
        .catch(err => {
            alert('shit happens...')
        })
    }

    const navigateToItem = (id) => {
        navigate(`/ViewRecipe?id=${id}`);
    }

    const deleteItem = (id) => {
        axiosInstance({
            method: 'DELETE',
            url: 'deleteRecept',
            params: {id: id}
        }).then(data => {
            fetchData();
        })
        .catch(err => {
            alert('shit happens...')
        })
    }

    return (
        <div className="__list">
            <div  style={{textAlign: 'right'}}>
                <button onClick={() => {navigate('/CreateRecipe')}} className="btn btn-success btn-sm m-3">Add New</button>
            </div>
            {
                recepts.map((el, index) => {
                    return(
                        <div className="row __item" key={index}>
                            <div onClick={() => {navigateToItem(el.Id)}} className="col-md-3 ">
                                {
                                    ++index + ". " + el.Name
                                }
                            </div>
                            <div onClick={() => {navigateToItem(el.Id)}} className="col-md-8">
                                {
                                    el.ContentText.substring(0,100)
                                }
                            </div>
                            <div className="col-md-1">
                                <button onClick={() => {deleteItem(el.Id)}} style={{borderRadius: '200px', position: 'absolute', zIndex: '100000'}} className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListRecipe;