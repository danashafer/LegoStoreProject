export const Profile = () => {
  return (
    <>
    <div className="d-flex justify-content-center">
      <div className="m-3 position-relative  " style={{width: 800}}>
        <img src=".././assets/images/backgroundLego.png" alt=""  className="w-100"/>
        <div className="position-absolute top-50 start-50 translate-middle bg-light rounded w-75 h-75">
            <img src="" alt="" className="rounded-circle m-2 border border-seconsary" style={{height: 200, width: 200}}/>
          <p className="fw-bold">user name</p>
           <p>user email</p>

           <div className="bg-secondary w-25 position-absolute start-50 translate-middle mt-5 rounded ">
            <p> view order history</p>

           </div>

          
          <i className="bi bi-clock-history"></i>
        </div>
      </div>
      </div>
    </>
  );
};
