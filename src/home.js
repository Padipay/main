import logo from '../src/images/Logo3.png';
import bgImage from '../src/images/digital-wallet 1.png'
function Homepage() {
    return ( 
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                        <img src={logo} alt="logo" />
                    {/* <button className="fancy-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto mt-4">
                            <a className="btn btn-primary get-started">Join Waitlist</a>
                        </div>
                    </div> */}
                </div>
            </nav>
    <div className="container-fluid">
        <div className="row main-text-row">
            <div className="col-lg-4 col-sm-12 wallet-img order-first order-lg-2">
                <img src={bgImage} alt="" />
            </div>
            <div className="col-lg-6 col-sm-12">
                <p>We’re cooking something ❤️</p>
                <h1>Fast and easy currency exchange</h1>
                <p>Africa's Number 1 choice for money exchange and remittances
                </p>
                <div className="waitlist">
                    <div className="col-8">
                        <p className="fw-bold">Join the Waitlist</p>
                        <p className="fw-lighter">Please enter your email address</p>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary waitlist-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Join Waitlist</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="exampleModalLabel">Join our Waitlist</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">First Name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Last Name</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                          </div>
                    </div>
                    <div className="modal-footer mb-3">
                        <button type="button" className="btn join-btn" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal2">Join Waitlist</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-body">
                        <h1 className="text-center">🚀</h1>
                        <h4 className="text-center">Yaay!, You’re on the Waitlist!</h4>
                        <p className="text-center added-info">We just sent you an email confirmation.You will be notificied once we launch</p>
                    </div>
                    <div className="modal-footer mb-3">
                        <button type="button" className="btn join-btn">Share on your socials</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
     );
}

export default Homepage;