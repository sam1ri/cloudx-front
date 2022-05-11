
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import './ViewRecipe.scss'

const ViewRecipe = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [recept, setRecept] = useState(null)

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            return navigate('/Login')
        }
        axiosInstance({
            method: 'GET',
            url: 'getReceptById',
            params: {
                id: searchParams.get("id")
            }
        }).then(res => {
            setRecept(res.data);
        })
            .catch(() => {
                alert('shit happens')
            })

    }, []);

    return (
        <div className="container-fluid">
            {
                recept &&
                (
                    <div className="__wrapper">
            <button onClick={() => {navigate(`/UpdateRecipe?id=${searchParams.get("id")}`)}} className="btn btn-edit btn-secondary m-3" style={{float: 'right'}}>Edit</button>

                        <div className="__image_wrapper">
                            <img style={{maxHeight: '300px', maxWidth: '800px'}} src={recept.base64Image} />
                        </div>
                        <div className="__content">
                            <h4>Name: {recept.Name}</h4>
                            <p>Permbajtja: {recept.ContentText}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ViewRecipe;