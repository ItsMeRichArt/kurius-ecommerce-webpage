const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			refresh_token: "",
			loginDate: 0,
			user: "",
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			signup: async (data) => {
				for (const key in data) {
					if (data[key] == "") return "Complete all spaces in the form"
				}
				let password = data.password.replaceAll(/\s/g,'')
				if (password.length > 7){
					try {
						let response = await getActions().apiFetch("signup", 'POST', data)
						if (response.ok){
							let responseJson = await response.json();
							return {
								"message" : responseJson.message + ". Please continue with the login",
								"validation" : "ok"
							}
						}
						else {
							let responseJson = await response.json();
							if (responseJson != undefined) return responseJson.message;
							else return "Internal error";
						}
					}
					catch(error){
						console.error({error})
					}
				}
				else return "Invalid password"
      },
			login: async (data) => {
				const store = getStore()
				try{
					let response = await getActions().apiFetch("login", 'POST', data)
					if (response.ok){
						let responseJson = await response.json()
						setStore({ token: responseJson.token, refresh_token: responseJson.refresh_token, loginDate: Date.now() }); //se resetea el store con los tokens
						let infoRequest = await getActions().apiFetch("checkout")
						if (infoRequest.ok){
							let userInfo = await infoRequest.json()
							setStore({ ...store, user: userInfo.name }); //se añadela info del ususario al token
							return "ok"
						}
						else return "Access revoked"
					}
					else {
						let responseJson = await response.json();
						if (responseJson != undefined) return responseJson.message;
						else return "Internal error";
					}
				}
				catch(error){
					console.error({error})
				}
      },
			logout: async () => {
				const store = getStore()
				try{
					let response = await getActions().apiFetch("logout", 'POST')
					if (response.ok){
						let responseJson = await response.json()
						setStore({ token: "", refresh_token: "", user: "" }); //se resetea todo el store
						console.log(responseJson.msg)
						return "ok"
						}
					else {
						let responseJson = await response.json();
						if (responseJson != undefined) return responseJson.message;
						else return "Internal error";
					}
				}
				catch(error){
					console.error({error})
				}
      },
			protectedTest: async () => {
				const store = getStore()
				let validation = await getActions().tokenTimeValidation()
				console.log(validation)
				if (validation === "Refresh successful" || "Token still valid"){
					try{
						let response = await getActions().apiFetch("checkout")
						if (response.ok){
							return "ok"
							}
						else {
							let responseJson = await response.json();
							return responseJson
						}
					}
					catch(error){
						console.error({error})
					}
				}
				else return "token problem"
      },
			tokenTimeValidation: async () => {
				const store = getStore()
				let loginDate = store.loginDate
				if (loginDate + 8000 < Date.now()){
					console.log("dentro de validacion")
					let refresh_token = store.refresh_token
					setStore({token: refresh_token})
					try{
						let response = await getActions().apiFetch("refresh", 'POST')
						if (response.ok){
							console.log("dentro del refresh")
							let responseJson = await response.json()
							setStore({
								token: responseJson.token,
								refresh_token: responseJson.refresh_token,
								loginDate: Date.now()
							})
							return "Refresh successful"
							}
						else {
							let responseJson = await response.json();
							if (responseJson != undefined) return responseJson
							else return "Tokens revoked"
						}
					}
					catch(error){
						console.error({error})
					}
				}
				else return "Token still valid"
      },
			apiFetch: async (endpoint, metodo='GET', data=null) => {
				const store = getStore()
				let url = process.env.BACKEND_URL;
				let headers = {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*",}
				if (store.token){
					headers["Authorization"] = "Bearer " + store.token
				}
				let request = {
					method: metodo,
					headers,
				}
				if (data){
					request.body = JSON.stringify(data)
				}
				return await fetch(url + "/api/" + endpoint, request);
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
