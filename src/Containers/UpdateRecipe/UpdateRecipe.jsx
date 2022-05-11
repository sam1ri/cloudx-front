
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import './UpdateRecipe.scss'
import axiosInstance from "../../axios";

const UpdateRecipe = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [recipe, setRecipe] = useState({
        id: '',
        name: '',
        contentText: '',
        base64Image: '',
        fileName: ''
    });

    const changedFile = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let imgBase64 = e.target.result;
            setRecipe({...recipe, base64Image: imgBase64, fileName: file.name})
        }
        reader.readAsDataURL(file);
    }

    const submitRecipe = () => {
        setLoading(true);
        axiosInstance({
            method: 'PUT',
            url: 'updateRecept',
            data: {...recipe}
        }).then(res => {
            navigate('/ListRecipe')
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/Login')
        }
        axiosInstance({
            method: 'GET',
            url: `getReceptById`,
            params: {id: searchParams.get("id")}
        }).then(res => {
            setRecipe({name: res.data.Name, contentText: res.data.ContentText, id: res.data.Id});
        }).catch(err => {
            alert('o fuck!')
        })
    }, []);

    return (
        <div className="container">
            <div className="__wrapper">
                <div className="form-group">
                    <label  htmlFor="inputAddress">Recipe Name</label>
                    <input value={recipe.name} onChange={(e) => {setRecipe({...recipe, name: e.target.value})}} type="text" className="form-control mt-1" placeholder="Cookies with jam" />
                </div>
                <div className="form-group mt-4">
                    <label  htmlFor="exampleFormControlTextarea1">Recipe Content</label>
                    <textarea value={recipe.contentText} onChange={(e) => {setRecipe({...recipe, contentText: e.target.value})}} className="form-control mt-1" placeholder="Lorem ipsum dolor sit amet...." rows="10"></textarea>
                </div>
                <div className="mt-3">
                    <label  htmlFor="formFileSm" className="form-label">Upload an image of your product:</label>
                    <input onChange={changedFile} className="form-control form-control-sm" type="file" />
                </div>
                <div style={{float: 'right'}}>
                    {loading &&<img className="mt-3" style={{marginRight: '10px'}} width="20" src="https://i.gifer.com/ZZ5H.gif" />}
                    <button onClick={submitRecipe} className="btn btn-success mt-3" >Save</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateRecipe;