const styles = {
    menuList: (base) => ({
        ...base,  
        "::-webkit-scrollbar": {
          width: "5px",
          height: "0px",       
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1"
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555"
        }
      })
}

export default styles