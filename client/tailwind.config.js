module.exports = {
  purge: [],
  theme: {
  		screens: {
      sm: '640px',
      sma:'455px',
      sd:'600px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
  	},
    extend: {
    	colors:{
    		blue:"#F1F7FF",
    		graydark:'#8b8b8b',
    		balance:'linear-gradient(95.8deg, #AE64D1 -3.34%, #46C1BA 97.61%)',
        middlePurple:'#AE64D1',
    	},
    	boxShadow:{
    		natural:'3px 4px 60px rgba(0, 0, 0, 0.25)',
    		light:'3px 4px 10px rgba(0, 0, 0, 0.25)'
    	},
    	borderRadius:{
    		curve:'72px'
    	},
    },
  },
  variants: {},
  plugins: [],
}
