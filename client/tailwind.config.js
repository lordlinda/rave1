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
        titleGray:'#A5A5A5',
        titleDark:'#313363',
        titleLink:'#8080df',
        amountGreen:'#3b9d39',
        dateGray:'#c4c4c4',
    		blue:"#F1F7FF",
    		graydark:'#8b8b8b',
    		balance:'linear-gradient(95.8deg, #AE64D1 -3.34%, #46C1BA 97.61%)',
        customPurple:'#A577EE',
    	},
    	boxShadow:{
        buttonShadow:"6px 6px 60px rgba(67, 67, 67, 0.25)",
    		planShadow:'0px 1px 10px rgba(0, 0, 0, 0.25)',
    		light:'3px 4px 10px rgba(0, 0, 0, 0.25)'
    	},
    	borderRadius:{
    		buttonRadius:'15px'
    	},
    },
  },
  variants: {},
  plugins: [],
}
