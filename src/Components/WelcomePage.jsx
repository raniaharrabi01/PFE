import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useParams } from 'react-router-dom';



const WelcomePage = () => {

  const { userId } = useParams();
  const navigate = useNavigate();
  const handleNavigation = () => {
      console.log('User ID:', userId);
       navigate("/CreateTemplate");
    }

    return (
    <section className="vh-100" style={{ backgroundImage: 'url("/images/Baground_image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-3">
              <img src="/images/welcome_img.jpg"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">RapportUnique</p>
              </div>
                <div className="form-outline mb-4">
                <p>Bienvenue ! Obtenez facilement et rapidement des rapports personnalisés. Créez votre propre modèle de rapport, enregistrez et exportez.</p>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" onClick={handleNavigation}
                     style={{ width: '100%', display: 'inline-block', textAlign: 'center'}}>
                     Créer un rapport 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      );

}
export default WelcomePage;