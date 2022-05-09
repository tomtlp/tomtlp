import Cookie from 'js-cookie';
export default{
    // token管理
    state:{
        token:''
    },
    mutations:{
        setToken:function(state,val)
        {
            state.token =val;
            Cookie.set('token',val)
        },
        clearToken:function(state)
        {
            state.token =''
            Cookie.remove('token')
        },
        getToken:function(state){
            state.token =state.token || Cookie.get('token')
        }
    }
}