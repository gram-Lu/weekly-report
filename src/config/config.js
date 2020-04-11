let config={
  //发送授权地址
  userAuthorizationUri:'https://github.com/login/oauth/authorize',
  //用户信息请求地址
  userInfoUri:"https://api.github.com/user",
  //redirect_uri地址
  redirect_uri:'http://localhost:8080/callback',
  //accessToken请求地址
  accessTokenUri:'https://github.com/login/oauth/access_token',
  //用户请求地址
  userInfoUrl:'https://api.github.com/user',
  //ClientId
  clientId:'57a863569982d94f05e4',
  clientSecret:'b2efa09970a4693a610a3df872cbebe0a633c8e5',
  scope:'user',
  state:'1',
  response_type:"token",
  grant_type : "grant_type",
  code:"",
  //accessToken请求地址
}
export default config;
