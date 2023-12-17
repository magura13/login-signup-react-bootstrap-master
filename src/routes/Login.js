import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginService } from '../services/Login';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const data = { email, password };
    try {
      const response = await LoginService(data);
      if (response.accessToken) {
        setEmail("");
        setPassword("");
        alert(`Logged Successfully! Here is your AccessToken: ${response.accessToken}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email/password");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-5 text-center">
          <h1 className="my-5 display-3 fw-bold ls-tight">
            Login <br />
          </h1>
        </div>
        <div className="col-lg-6 mb-5">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example3" className="form-control" />
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
                <button type="submit"
                  className="btn btn-block"
                  style={{ backgroundColor: '#000', color: '#fff' }}>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
