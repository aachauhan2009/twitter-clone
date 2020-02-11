import React from "react";
import URI from "urijs";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const url = new URI(window.location.href);
    const { oauth_token: token, oauth_verifier: verifier } = url.search(true);
    if (localStorage.getItem('user')) {
      setIsLoggedin(true);
      setIsLoading(false);
    } else if (token && verifier){
      setIsLoading(true);
      fetch('api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(url.search(true))
      }).then(data => data.json()).then(data => {
        localStorage.setItem('user', JSON.stringify(data)); 
        setIsLoggedin(true);
        setIsLoading(false);
      });
    }

    if (token && verifier) {
      history.replace("/");
    }
  }, [history]);

  const signIn = () => {
    fetch("api/getToken").then(data => data.json()).then(data => {
      window.location.replace(`https://api.twitter.com/oauth/authenticate?oauth_token=${data.token}`);
    });
  }; 

  if (isLoading)
    return <h1>Signing In...</h1>
  return isLoggedin ? props.children : (
    <div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}