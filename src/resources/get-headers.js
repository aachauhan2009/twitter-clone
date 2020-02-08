export const getHeaders = () => {
  const user = localStorage.getItem('user');
  const { oauth_token: token, oauth_token_secret: secret } = JSON.parse(user) || {};
  return {
    'Content-Type': 'application/json',
    'Authorization': `token=${token}&secret=${secret}`
  }
}