import {React,useState }from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {SignUp} from "../services/SignUp"


function SignUpPage() {

  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {  
      event.preventDefault();
      const data = { userName, email, password };     
      try {
        const  response = await SignUp(data);
        if (response.response.default==="User added successfully") {
          setuserName("");
          setEmail("");
          setPassword("");
          alert('Logged Sucessfully!')
          navigate("/login")
        }    
      } catch(error) {
        console.log(error)
        if (error.response && error.response.status === 409) {
          alert("Email / UserName / Password already exists")
        } else {
          console.log(error)
        }
      }
  }
  return (
    <section style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Sign Up <br />
                <span className="text-primary">Page</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                  Single Sign Up Page
              </p>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-outline">
                          <input value={userName} onChange={(e) => setuserName(e.target.value)} type="text" id="form3Example1" className="form-control" />
                          <label className="form-label" htmlFor="form3Example1">
                            User Name
                          </label>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example3" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
