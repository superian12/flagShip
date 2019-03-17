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
    }
}