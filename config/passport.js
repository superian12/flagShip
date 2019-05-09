module.exports = {
    isAuth: () => {
        if(typeof authSession == 'undefined'){
            return false
        
          } else {
            return true
          }
    },
    isAuthz: () => {
        if(typeof authSession == 'undefined'){
            res.redirect('/ops/')
        
          } 
    },
    isAdmin: () =>{
      if(typeof authSession == 'undefined' || authSession.access != 1){
        return false
      }
      else{
        return true
      }
    }
}