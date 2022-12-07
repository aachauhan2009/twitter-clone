import React from "react";
import URI from "urijs";
import { Center, Button, Spinner, useColorModeValue } from '@chakra-ui/react'


import { useHistory } from "react-router-dom";
import { useSetUser, useUser } from "../../context/user";

export default function Login(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const setUser = useSetUser();
  const user = useUser();

  React.useEffect(() => {
    const url = new URI(window.location.href);
    const { oauth_token: token, oauth_verifier: verifier } = url.search(true);
    console.log(token, verifier);
    if (localStorage.getItem('user')) {
      console.log("if", localStorage.getItem('user'));
      setIsLoading(false);
    } else if (token && verifier) {
      console.log("else if");
      setIsLoading(true);
      fetch('api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(url.search(true))
      }).then(data => data.json()).then(data => {
        setUser(data);
        setIsLoading(false);
      });
    }

    if (token && verifier) {
      history.replace("/");
    }
  }, [history, setUser]);
  const bg = useColorModeValue('blue.50', 'gray.800');
  const signIn = () => {
    fetch(`api/getToken?callback=${window.location.origin}`).then(data => data.json()).then(data => {
      console.log(data);
      if (data.token) {
        window.location.replace(`https://api.twitter.com/oauth/authenticate?oauth_token=${data.token}`);
      }
    });
  };
  return <Center h={user ? "100%" : "100vh"} bg={bg} > {
      isLoading ? <Spinner /> : user ? props.children : (

        <Button onClick={signIn}>Sign In</Button>
      )}
  </Center>
}