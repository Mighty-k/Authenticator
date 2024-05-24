import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
  const userRef = useRef();
  //focus on user input
  const errRef = useRef()
    //focus on error if exist

    const [user, SetUser] = useState('')
    const [validName, setValidName] = useState(false)  
    const [userFocus, setUserFocus]= useState(false)

    const [password, setpassword] = useState('')
    const [validpassword, setValidpassword] = useState(false)  
    const [passwordFocus, setpasswordFocus]= useState(false)

    const [matchpassword, setMatchpassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)  
    const [matchFocus, setMatchFocus]= useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [succes, setSucces] = useState(false)

    useEffect(() => {
      userRef.current.focus()
    }, [])
    
    useEffect(() =>{
      const result = USER_REGEX.test(user)
      //checks if user name is valid
      setValidName(result)

    },[user])

    useEffect(() =>{
      const result = PWD_REGEX.test(password)
      //checks if password name is valid
      setValidpassword(result)
      const match = password === matchpassword
      setValidMatch(match)

    },[password, matchpassword])

    useEffect(() =>{
      setErrMsg('');
    }, [user,password,matchpassword])

    
     useEffect(() =>{
      const button = document.querySelector('.btn-success') 
      button.addEventListener('mouseover',(butt)=>{
        if (!validName || !validpassword || !validMatch) {
         
          butt.target.classList.toggle('btn-right')
          button.style.background="red"
          button.style.border="red"
        }else{
          butt.target.classList.add('stop')
          button.style.background="green"
          button.style.border="green"
        }
      })
     }, [validName, validpassword, validMatch])
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const v1 = USER_REGEX.test(user)
      const v2 = PWD_REGEX.test(password)
      if (!v1 || !v2) {
        setErrMsg('Invalid Entry')
        return
      } 

        try {
          const resp = await axios.post(REGISTER_URL, JSON.stringify({user:user, password:password}),

          {
            headers : { 
              'Content-Type' : 'application/json',
              'Access-Control-Allow-origin' : 'http://localhost:5173/'
            },
            withCredentials: true
          }
          )
          const data = await resp.json();
          const userExists = data.some((user) => user.user === user);
          if (userExists) {
            setErrMsg('User with this email already exists');
            return;
          }
          
          console.log(resp.data)
          console.log(Json.stringify(resp));
          setSucces(true)
        } catch (error) {
        
        //  else{
        //     setErrMsg('Sign up failed')
        //   }
          errRef.current.focus()
        }
    } 
    

  return(
    <>
    {succes ? (
      <div className="text-center">
        <h1> You have succesfully signed up</h1>
        <p>
          <a href="#">Sign in</a>
        </p>
      </div>
    ):(
    
    <div className="row justify-content-center register-signup ">
      <div className="col-4 first-col-sign text-center">
        <h2>Welcome!</h2>
      </div>
      <div className="col-4 register">
       <p ref={errRef} className={errMsg ? 'errmsg': 'offscreen'} aria-aria-live="assertive">{errMsg}</p> 
       <h1 className="text-center signup">Sign up</h1>
       <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="username">
            Username:
            <span className={validName ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validName || !user ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes}/>
            </span>
            </label>
          <input
            className="form-control"
             type="text"
             id="username"
             ref={userRef}
             autoComplete="off"
             onChange={(e)=> SetUser(e.target.value)} 
             required
             aria-invalid = {validName ? 'false':'true'}
             area-aria-describedby="uidnote"
             //aria is for disabled people
             onFocus={() => setUserFocus(true)}
             onBlur={() => setUserFocus(false)}
             />
             <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
              {/* if userFocus is true and the input is not empty and the name is not valid */}
              <FontAwesomeIcon icon={faInfoCircle}/>
              4 to 24 characters.<br/>
              Must begin with a letter. <br />
              Letters, numbers, underscores,hyphens allowed. 
             </p>

              <label htmlFor="password" className="form-label" >
                Password:
                 <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                 <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} />
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                autoComplete="off"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
                aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setpasswordFocus(true)}
                onBlur={() => setpasswordFocus(false)}
              />
              <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                   8 to 24 characters.<br />
                   Must include uppercase and lowercase letters, a number and a special character.<br />
                   Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="period">.</span>
              </p>


               <label htmlFor="confirm_password"
                 className="form-labe"
               >
                  Confirm Password:
                  <FontAwesomeIcon icon={faCheck} className={matchpassword && validMatch ? "valid" : "hide"} />
                   <FontAwesomeIcon icon={faTimes} className={validMatch || !matchpassword ? "hide" : "invalid"} />
               </label>
               <input
                 type="password"
                 className="form-control"
                 id="confirm_password"
                 autoComplete="off"
                 onChange={(e) => setMatchpassword(e.target.value)}
                 value={matchpassword}
                 required
                 aria-invalid={validMatch ? "false" : "true"}
                 aria-describedby="confirmnote"
                 onFocus={() => setMatchFocus(true)}
                 onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                 Must match the first password input field.
                </p>
                <div className="btn-signup">
                <button  className="btn btn-success text-center stop ">
                  Sign up
                </button>
                </div>
       </form>
       <p>
        Already registered? <br />
        <span className="line">
          <Link to={'/Login'}>Sign in</Link>
                  </span>
       </p>
    </div>
    </div>
    )}
    </>
  )
}
export default Register