import 'bootstrap/dist/css/bootstrap.min.css'
import './Style.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function Authentification() {
    const[adresse,setadresse]=useState('')
    const[password,setpassword]=useState('')
    const[errorMessage, setErrorMessage] = useState('');
    const[userId,setuserId]=useState('0')


    const Navigate=useNavigate();

    const validate=()=>{
        let result = true;
        if(adresse === '' || adresse === null){
            result=false;
        }
        if(password === '' || password === null){
            result=false;
        }
        return result;
      }

      const handleClick_Login = (e) => {
        e.preventDefault();
        const UserAdmin = { adresse, password };
        if (validate()) {
          fetch('http://localhost:8080/user_admin/checkUserAdminPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserAdmin)
          })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to authenticate user');
            }
            return res.json();
          })
          .then((isValid) => {
            if (isValid) {
              // Si l'utilisateur est authentifié, récupérez son ID
              console.log(adresse);
              fetch(`http://localhost:8080/user_admin/getUserID/${adresse}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to fetch user ID');
                }
                return response.json();
              })
              .then((userId) => {
                console.log('User ID:', userId);
                setuserId(userId);
                Navigate('/WelcomePage');
              })
              .catch((error) => {
                console.error('Error fetching user ID:', error);
              });
            } else {
              setErrorMessage('~ Incorrect Password or Email ~');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      };
      

  return (
    <div>
    <section className="vh-100" >
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid" alt="Sample image" />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form onSubmit={handleClick_Login}>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Connexion</p>
          </div>
            <div className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control form-control-lg"
                placeholder="Entrez l'adresse e-mail" value={adresse}
                onChange={(e)=>setadresse(e.target.value)}
                />
            </div>
            <div className="form-outline mb-3">
              <input type="password" id="form3Example4" className="form-control form-control-lg"
                placeholder="Entrez le mot de passe" value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
            </div>
            <span className="error_msg">{errorMessage}</span>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-primary btn-lg"
                 style={{ width: '100%', display: 'inline-block', textAlign: 'center'}}>
                Se Connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
  );
}

export default Authentification;
