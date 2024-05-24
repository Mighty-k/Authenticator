import { Link } from "react-router-dom"

const Login = () => {


  
  return(
    <div>
       <div className="row justify-content-center register-signup ">
      <div className="col-4 first-col-sign text-center">
        <h2>Welcome!</h2>
      </div>
      <div className="col-4 register">
       {/* <p ref={errRef} className={errMsg ? 'errmsg': 'offscreen'} aria-aria-live="assertive">{errMsg}</p>  */}
       <h1 className="text-center signup">Sign in</h1>
       <form >
          <label className="form-label" htmlFor="username">
            Username:
            {/* <span className={validName ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validName || !user ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes}/>
            </span> */}
            </label>
          <input
            className="form-control"
             type="text"
             id="username"
            //  ref={userRef}
             autoComplete="off"
            //  onChange={(e)=> SetUser(e.target.value)} 
             required
            //  aria-invalid = {validName ? 'false':'true'}
            //  area-aria-describedby="uidnote"
             //aria is for disabled people
            //  onFocus={() => setUserFocus(true)}
            //  onBlur={() => setUserFocus(false)}
             />
             {/* <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
              if userFocus is true and the input is not empty and the name is not valid
              <FontAwesomeIcon icon={faInfoCircle}/>
              4 to 24 characters.<br/>
              Must begin with a letter. <br />
              Letters, numbers, underscores,hyphens allowed. 
             </p> */}

              <label htmlFor="password" className="form-label" >
                Password:
                 {/* <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                 <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} /> */}
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                autoComplete="off"
                // onChange={(e) => setpassword(e.target.value)}
                // value={password}
                required
                // aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordnote"
                // onFocus={() => setpasswordFocus(true)}
                // onBlur={() => setpasswordFocus(false)}
              />
              {/* <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                   8 to 24 characters.<br />
                   Must include uppercase and lowercase letters, a number and a special character.<br />
                   Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="period">.</span>
              </p> */}


              
                <div className="btn-signup">
                <button  className="btn btn-success text-center stop ">
                  Sign in
                </button>
                </div>
       </form>
       <p>
        Register <br />
        <span className="line">
          <Link to={'/Register'}>Sign Up </Link>
                  </span>
       </p>
    </div>
    </div>
    </div>

  )
}
export default Login