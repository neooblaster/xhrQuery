/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ----------------------------------------------------------------------------------------------------------------------- ** 
/** ---																																						--- **
/** --- 											----------------------------------------------- 											--- **
/** ---															{ X H R Q U E R Y . J S }															--- **
/** --- 											----------------------------------------------- 											--- **
/** ---																																						--- **
/** ---		AUTEUR 	: Neoblaster																													--- **
/** ---																																						--- **
/** ---		RELEASE	: 18.05.2015																													--- **
/** ---																																						--- **
/** ---		VERSION	: 1.2																																--- **
/** ---																																						--- **
/** ---																																						--- **
/** --- 														-----------------------------															--- **
/** --- 															 { C H A N G E L O G } 																--- **
/** --- 														-----------------------------															--- **
/** ---																																						--- **
/** ---		VERSION 1.2 : 18.05.2015																												--- **
/** ---		------------------------																												--- **
/** ---			- Correction de la méthode inputs qui ne récupérait pas l'argument dans le cas d'un paramètre de type		--- **
/** ---				object 																																--- **
/** ---																																						--- **
/** ---		VERSION 1.1 : 16.05.2015																												--- **
/** ---		------------------------																												--- **
/** ---			- Révision de la méthode callback() afin de gérer un nombre x de fonction de traitement						--- **
/** ---				-> rename callback() to callbacks()																							--- **
/** ---																																						--- **
/** ---		VERSION 1.0 : 03.05.2015																												--- **
/** ---		------------------------																												--- **
/** ---			- Première release																													--- **
/** ---																																						--- **
/** --- 											-----------------------------------------------------										--- **
/** --- 												{ L I S T E      D E S      M E T H O D E S } 											--- **
/** --- 											-----------------------------------------------------										--- **
/** ---																																						--- **
/** ---		callbacks :																																	--- **
/** ---		-----------																																	--- **
/** ---			- output :: [xhrQuery]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [function]	::	acecpte x fonctions en paramètre																--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La fonction de callback est la fonction qui traiter la réponse retournée par le serveur					--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		inputs :																																		--- **
/** ---		--------																																		--- **
/** ---			- output :: [xhrQuery]			::	renvois la classe pour une utilisation successive								--- **
/** ---			- input	:: [string][element]	::	accepte des id sous forme de chaine ou des elements HTML input				--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La fonction parcour l'ensemble des arguments à la recherche d'un couple nom de variable / valeur		--- **
/** ---				La fonction est autonôme. Elle determine toutes les infos elle-même												--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		method :																																		--- **
/** ---		--------																																		--- **
/** ---			- output :: [xhrQuery]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [string]		::	accepte 'get' ou 'post'																			--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La fonction définie le mode d'émission des données pour la méthode send()										--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		progress :																																	--- **
/** ---		----------																																	--- **
/** ---			- output :: [xhrQuery]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [function]	::	accepte une fonction'																			--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La méthode définie la fonction de traitement de l'avancement d'un upload de fichier							--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		send :																																		--- **
/** ---		------																																		--- **
/** ---			- output :: [boolean]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [-]			::	aucun paramètres																					--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La méthode déclenche l'envois de la requête auprès de la cible à l'aide des données saisie				--- **
/** ---				La methodes send() doit être toujours invoquer en dernier, sinon les donnée suivante ne seront pas 	--- **
/** ---				traité																																--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		target :																																		--- **
/** ---		--------																																		--- **
/** ---			- output :: [xhrQuery]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [string]		::	Accepte uniquement une chaine de caractère												--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La méthode définie la cible de la requête qui devra traiter les donnée envoyé à l'aide de send()		--- **
/** ---				Selon la cible, il se peut qu'il soit nécessaire d'indiquer le chemin complet vers le script				--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---		values :																																		--- **
/** ---		--------																																		--- **
/** ---			- output :: [xhrQuery]	::	renvois la classe pour une utilisation successive										--- **
/** ---			- input	:: [string]		::	Accepte autant de couple "name=value"														--- **
/** ---																																						--- **
/** ---			- Description	::																														--- **
/** ---				La méthode permet d'envoyer directement des données sous la forme : nom_de_variable=valeur				--- **
/** ---																																						--- **
/** ---																																						--- **
/** ---																																						--- **
/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **

	Objectif de la fonction :
	-------------------------
	
		L'objectif de la classe JS xhrQuery et de permettre l'envoie de requêtes AJAX auprès du serveur. Elle se doit de fonctionner
	quelque soit les besoins. Anciennement, une version existait pour les simples donnée. Une seconde version gérait uniquement l'envois
	de fichiers. Parfois, il était nécessaire de combiner les deux. En l'état, ce n'était pas possible.
	
		Cette classe JavaScript permet une utilisation immédiate sans déclaration de variable. L'envois de paramètres à été 
	réduit au besoin qui est de définir la cible qui doit traiter la requête :
	
		>_ xhrQuery().target('target.php').send();
		
		La méthode HTTP par défaut est la méthode POST, car plus appropriée quelque soit les besoins. Cependant, elle permet quand 
	même de faire des requêtes en méthode GET. Pour celà, ajouter la méthode : .method('get') :
	
		>_ xhrQuery().target('target.php').method('get').send();
		
	Attention, il n'est pas possible d'envoyer des fichiers via la méthode GET. Si vous essayer d'envoyer des fichiers, un warning
	est émis et les ces données sont ignorée
	
		Dans la plupart des cas, une requête AJAX retourne un résultat. Pour traiter le résultat, il faut définir la fonction de traitement
	appelé callback. La fonction de traitement doit admettre au minimum un paramètre 'data' exemple ma_function(data){}
	
		>_ xhrQuery().target('target.php').callbacks(ma_function).send();
		
		Sur le même principe, il est possible de passer en paramètres une fonction gérant l'avancement d'un upload de fichier.
	La fonction de traitement d'avancement de l'upload doit admettre deux paramètres au minimum : ma_progress_function(uploaded, totalSize){};
	
		>_ xhrQuery().target('target.php').callbacks(ma_function).progress(ma_progress_function).send();
		
		Pour envoyer des données, deux solution s'offre à vous. Soit en spécifiant un champs de donnée qui sera alors determiné par la fonction exemple :
		
			<input id="pseudo" type="text" name="pseudo" value="neoblaster" />
			<input id="password" type="text" name="password" value="uncode" />
			
			>_ xhrQuery().target('target.php').callbacks(ma_function).inputs('pseudo', 'password')send();
			
		Deuxième solution : envoyer les valeurs directement :
		
			>_ xhrQuery().target('target.php').callbacks(ma_function).values('pseudo=neoblaster', 'password=uncode')send();
		
		Pour un traitement de fichier plus aisé, il est conseillé d'utiliser la fonction PHP fixFilesArray(); afin de ranger les données des fichiers par fichier
		et non pas par catégorie. Pour en savoir plus, consuler le fichier readme.txt
		
	Description fonctionnelle :
	---------------------------

/** ----------------------------------------------------------------------------------------------------------------------- **
/** ----------------------------------------------------------------------------------------------------------------------- **/


/** ----------------------------------------------------------------------------------------------------------------------- **
/** ---																																						--- **
/** ---													Déclaration de l'instance xhrQuery														--- **
/** ---																																						--- **
/** ----------------------------------------------------------------------------------------------------------------------- **/
function xhrQuery(){
	/** -------------------------------------------------------------------------------------------------------------------- **
	/** ---																																					--- **
	/** ---											Déclaration des méthodes de l'instance xhrQuery											--- **
	/** ---																																					--- **
	/** -------------------------------------------------------------------------------------------------------------------- **/
	this.xhr_engine = null;						// XMLHttpRequest :: Moteur AJAX
	this.xhr_errors = [];						// Array 			:: Liste des erreurs enregistrées
	this.xhr_callbacks = [];					// Array				:: Liste des fonctions qui doivent traiter LE resultat (resultat unique)
	this.xhr_form_data = new FormData();	// Object 			:: Instance contenant les données envoyée par
	this.xhr_method = 'post';					// String 			:: Méthode d'envoie de donnée {post} ou {get}
	this.xhr_progress = null;					// Function 		:: Fonction d'affichage de l'avancement du transfert
	this.xhr_raw_data = [];						// Array 			:: Liste des couples : nom=valeur pour un envois de donnée en method GET
	this.xhr_target = null;						// String 			:: Script serveur cible
	this.xhr_send_file = false;				// Boolean			:: Indique si des données issue d'un input type file à été inséré

	
	
	/** -------------------------------------------------------------------------------------------------------------------- **
	/** ---																																					--- **
	/** ---											Déclaration des méthodes de l'instance xhrQuery											--- **
	/** ---																																					--- **
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la fonction de retour callback **/
	this.callbacks = function(){
		/** Parcourir les arguments **/
		for(var i = 0; i < arguments.length; i++){
			/** Tester l'arguments = - Si l'argument est une fonctions, alors on l'admet **/
			if(typeof(arguments[i]) === 'function'){
				this.xhr_callbacks.push(arguments[i]);
			} else {
				this.xhr_errors.push({"error_level":2,"error_message":"callback() :: The input callback '"+arguments[i]+"' is not a function."});
			}
		}
		
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration des champs input de type text **/
	this.inputs = function(){
		/** Parcourir les arguments donnée en paramètre **/
		for(var i = 0; i < arguments.length; i++){
			/** Identifier l'argument **/
			var input = null;
			
			if(typeof(arguments[i]) === 'string'){
				input = document.getElementById(arguments[i]);
			} else {
				input = arguments[i];
			}
			
			
			/** Analyse de l'entrée **/
			if(input === null){
				this.xhr_errors.push({"error_level":2,"error_message":"inputs() :: The input number "+i+" doesn't not exist -> input ignored."});
			} else {
				/** Récupérer le type de l'input pour y traiter les données **/
				var input_type = input.getAttribute('type');
				
				if(input_type !== null){
					/** Intégration des données **/
					switch(input_type){
						/** Input de type file **/
						case 'file':
							/** Parcourir les fichiers (cas potentiel d'un input multiple) **/
							for(var f = 0; f < input.files.length; f++){
								this.xhr_form_data.append('file[]', input.files[f]);
							}
							this.xhr_send_file = true;
						break;

						/** Input de type : text, password, hidden **/
						case 'text':
						case 'password':
						case 'hidden':
							var input_name = input.getAttribute('name');
							var input_value = input.value;

							if(input_name !== null){
								this.xhr_form_data.append(input_name, input_value);
								this.xhr_raw_data.push(input_name+'='+input_value);
							} else {
								this.xhr_errors.push({"error_level":2,"error_message":"inputs() :: The input number "+i+" don't have attribut name -> input ignored."});
							}
						break;
						default:
							this.xhr_errors.push({"error_level":2,"error_message":"inputs() :: The input number "+i+" with type = "+input_type+" not managed with xhrQuery() -> input ignored."});
						break;
					}
				} else {
					this.xhr_errors.push({"error_level":2,"error_message":"inputs() :: The input number "+i+" don't have attribut type -> input ignored"});
				}
			}
			
		}
		
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la méthode d'envoie de données **/
	this.method = function(method){
		/** Déclaration des méthode autorisée **/
		var methods = ['get', 'post'];

		/** Neutralisation de la casse **/
		method = method.toLowerCase();

		/** Controle de la méthode **/
		if(methods.lastIndexOf(method) > -1){
			this.xhr_method = method;
		} else {
			this.xhr_errors.push({"error_level":2,"error_message":"methode() :: The method '"+method+"' is not allowed : use 'get' or 'post'"});
		}

		/** auto-renvois **/
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la méthode d'envoie de données **/
	this.progress = function(progress){
		/** Controller que le paramètre donné est bien une fonction **/
		if(typeof(progress) === 'function'){
			this.xhr_progress = progress;
		} else {
			this.xhr_errors.push({"error_level":2,"error_message":"progress() :: The input progress '"+progress+"' is not a function."});
		}

		
		/** auto-renvois **/
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode d'envois de la requête **/
	this.send = function(){
		var query_sent = true;
		
		/** Pour émettre la requête il faut disposer au minimum de la cible du script . Si c'est le cas, executer **/
		if(this.xhr_target !== null){
			/** Création de l'instance XMLHttpRequest **/
			this.xhr_engine = new this.xhr();
			
			
			/** Déclaration de la fonction de gestion des changements d'état de la requête si définie **/
			if(this.xhr_callback !== null){
				this.xhr_engine.onreadystatechange = function(){
					/** Lorsque la requête est terminée, alors executer la fonction de callback spécifiée **/
					if (this.xhr_engine.readyState === 4 && (this.xhr_engine.status === 200 || this.xhr_engine.status === 0)){
						for(var i = 0; i < this.xhr_callbacks.length; i++){
							this.xhr_callbacks[i](this.xhr_engine.responseText);
						}
						//this.xhr_callback[0](this.xhr_engine.responseText);
					}
				}.bind(this);
			} else {
				this.xhr_errors.push({"error_level":0,"error_message":"xhrQuery() running without callback function."});
			}
			
			
			/** Déclaration de la function de gestion de la progression de l'envoie de donnée si définie **/
			if(this.xhr_progress !== null){
				/** Déclaration de la function de gestion de la progression de l'envoie de donnée **/
				this.xhr_engine.upload.onprogress = function(e){
					var uploaded = e.loaded;
					var totalSize = e.total;
					
					this.xhr_progress(uploaded, totalSize);
				}.bind(this);
			}
			
			
			/** Envoies des données selon la méthode spécifiée **/
			switch(this.xhr_method){
				case 'get':
					/** Convertir les donnée raw en chaine URL **/
					var url_vars = null;
					
					for(var i = 0; i < this.xhr_raw_data.length; i++){
						url_vars = (url_vars !== null) ? url_vars+'&'+this.xhr_raw_data[i] : this.xhr_raw_data[i];
					}
					
					/** Emettre l'alerte si des données de type input file on été saisies **/
					if(this.xhr_send_file){
						this.xhr_errors.push({"error_level":2,"error_message":"send() :: Datas sent with 'GET' method. The files datas has not been sent."});
					}
					
					/** Envoyer les données **/
					this.xhr_engine.open("GET", this.xhr_target+'?'+url_vars, true);
					this.xhr_engine.send(null);
				break;
				case 'post':
					this.xhr_engine.open("POST", this.xhr_target, true);
					this.xhr_engine.send(this.xhr_form_data);
				break;
			}
		} else {
			this.xhr_errors.push({"error_level":1,"error_message":"send() :: The server script target is not defined. You must use .target($target)"});
		}
		
		
		/** Gestion des erreurs **/
		if(this.xhr_errors.length > 0){
			console.log('xhrQuery() :: Below, the list of all encountered errors :');
			
			for(var i = 0; i < this.xhr_errors.length; i++){
				var error_num = i + 1;
				switch(this.xhr_errors[i].error_level){
					case 0 :
						console.log("\t"+this.xhr_errors[i].error_message);
					break;
					case 1 :
						console.error("\t"+this.xhr_errors[i].error_message);
						query_sent = false;
					break;
					case 2 :
						console.warn("\t"+this.xhr_errors[i].error_message);
					break;
				}
			}
		}
		
		
		/** Indicateur d'execution de la fonction **/
		return query_sent;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la cible **/
	this.target = function(target){
		/** Assignation de la cible **/
		this.xhr_target = target;
		
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la cible **/
	this.values = function(){
		for(var i = 0; i < arguments.length; i++){
			var value = arguments[i].split('=');
			var value_name = value[0];
			var value_value = value[1];
			
			this.xhr_form_data.append(value_name, value_value);
			this.xhr_raw_data.push(arguments[i]);
		}

		/** auto-renvois **/
		return this;
	};
	
	
	/** -------------------------------------------------------------------------------------------------------------------- **/
	/** > Méthode de déclaration de la cible **/
	this.xhr = function(){
		var xhr = null;

		/** S'il s'agit d'Internet Explorer de Microsoft **/
		if(window.ActiveXObject){
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} 
			catch (e){
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		/** Sinon pour les autres navigateur on utilise XMLHttpRequest **/
		else {
			xhr = new XMLHttpRequest();
		}

		return xhr;
	};
	
	
	/** auto-renvois **/
	return this;
}