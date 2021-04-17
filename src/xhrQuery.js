/** ---------------------------------------------------------------------------------------------------------------- **
/** ---------------------------------------------------------------------------------------------------------------- **
/** ---                                                                                                          --- **
/** ---                             -----------------------------------------------                              --- **
/** ---                                           { X H R Q U E R Y . J S }                                      --- **
/** ---                             -----------------------------------------------                              --- **
/** ---                                                                                                          --- **
/** ---        AUTEUR     : Neoblaster                                                                           --- **
/** ---        RELEASE    : 18.01.2021                                                                           --- **
/** ---        VERSION    : 1.5                                                                                  --- **
/** ---                                                                                                          --- **
/** ---                                                                                                          --- **
/** ---                                                         -----------------------------                    --- **
/** ---                                                              { C H A N G E L O G }                       --- **
/** ---                                                         -----------------------------                    --- **
/** ---                                                                                                          --- **
/** ---    @TODO : Gestion des code status                                                                       --- **
/** ---    @TODO : définition de qui est une erreur qui est ok                                                   --- **
/** ---    @TODO : définition du mode de réponse (xml, plaintext, json=>parsé)                                   --- **
/** ---                                                                                                          --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.5-RC3 : 17.04.2021                                                                      --- **
/** ---        ----------------------------                                                                      --- **
/** ---            - Ajout de deux méthodes pour configurer le mode synchrone/asynchrone :                       --- **
/** ---                 - async() -> Met le mode asynchrone                                                      --- **
/** ---                 - sync() -> Met le mode synchrone                                                        --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.5 : 29.07.2018                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Ajout de la méthode 'CORSUseCredentials()' qui permet l'utilisation d'identification        --- **
/** ---            effectuée sur d'autre site en CORS                                                            --- **
/** ---            - Si l'entête 'Authorization' n'est pas défini et que username() et/ou password()             --- **
/** ---            ont été utilisé, l'identifiant sera encodé et l'entête Authorization défini avec la valeur    --- **
/** ---            encodée                                                                                       --- **
/** ---            - Ajout de la méthode 'password()' pour définir le mot de passe de connexion pour la méthode  --- **
/** ---              d'authentification basique                                                                  --- **
/** ---            - Ajout de la méthode 'username()' pour définir l'identifiant de connexion pour la méthode    --- **
/** ---              d'authentification basique                                                                  --- **
/** ---            - Ajout d'une méthode pour passer les entêtes HTTP : .headers() :                             --- **
/** ---                - Deux modes d'utilisations :                                                             --- **
/** ---                    A.) Deux arguments :                                                                  --- **
/** ---                        mHeader : Chaine de texte - Nom de l'entête HTTP                                  --- **
/** ---                        sValue  : Chaine de texte - Valeur de l'entête HTTP                               --- **
/** ---                    A.) Un object :                                                                       --- **
/** ---                        {property: value} :                                                               --- **
/** ---                            property = entête HTTP                                                        --- **
/** ---                            value    = valeur entête HTTP                                                 --- **
/** ---            - Ajout d'une méthode pour récupérer la réponse au lieu en plus de la callbacks               --- **
/** ---            - La méthode callbacks n'est plus obligatoire                                                 --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.4 : 27.03.2017                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Prise en charge des champs textarea, uniquement en method POST                              --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.3 : 20.03.2017                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Ajout de la méthode forms() qui gère l'assimilation des données comprise dans le formulaire donnée --- **
/** ---            - En conséquence amélioration de la fonctions input pour gérer davantage d'input              --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.2 : 18.05.2015                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Correction de la méthode inputs qui ne récupérait pas l'argument dans le cas d'un paramètre de type  --- **
/** ---                object                                                                                    --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.1 : 16.05.2015                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Révision de la méthode callback() afin de gérer un nombre x de fonction de traitement       --- **
/** ---                -> rename callback() to callbacks()                                                       --- **
/** ---                                                                                                          --- **
/** ---        VERSION 1.0 : 03.05.2015                                                                          --- **
/** ---        ------------------------                                                                          --- **
/** ---            - Première release                                                                            --- **
/** ---                                                                                                          --- **
/** ---------------------------------------------------------------------------------------------------------------- **
/** ---------------------------------------------------------------------------------------------------------------- **

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

/** ---------------------------------------------------------------------------------------------------------------- **
/** ---------------------------------------------------------------------------------------------------------------- **/


/** ---------------------------------------------------------------------------------------------------------------- **
/** ---                                                                                                          --- **
/** ---                                     Déclaration de l'instance xhrQuery                                   --- **
/** ---                                                                                                          --- **
/** ---------------------------------------------------------------------------------------------------------------- **/
function xhrQuery(){
	/** ------------------------------------------------------------------------------------------------------------ **
	/** ---                                                                                                      --- **
	/** ---                           Déclaration des méthodes de l'instance xhrQuery                            --- **
	/** ---                                                                                                      --- **
	/** ------------------------------------------------------------------------------------------------------------ **/
    this.xhr_engine = null;              // XMLHttpRequest :: Moteur AJAX
    this.xhr_errors = [];                // Array          :: Liste des erreurs enregistrées
    this.xhr_executed = 0;               // Number         :: Nombre d'éxecution réussie
    this.xhr_callbacks = [];             // Array          :: Liste des fonctions qui doivent traiter LE resultat (resultat unique)
    this.xhr_errorbacks = [];            // Array          :: Liste des fonctions qui s'exécute en cas d'échec
    this.xhr_form_data = new FormData(); // Object         :: Instance contenant les données envoyée par
    this.xhr_method = 'post';            // String         :: Méthode d'envoie de donnée {post} ou {get}
    this.xhr_progress = null;            // Function       :: Fonction d'affichage de l'avancement du transfert
    this.xhr_raw_data = [];              // Array          :: Liste des couples : nom=valeur pour un envois de donnée en method GET
    this.xhr_response = [];              // Array          :: Liste des réponses des requêtes XMLHttpRequest
    this.xhr_target = null;              // String         :: Script serveur cible
    this.xhr_send_file = false;          // Boolean        :: Indique si des données issue d'un input type file à été inséré
    this.xhr_warn_textarea = false;      // Boolean        :: Indique la présence de champs textarea (incompatible avec la méthode get)
    this.xhr_headers = {};
    this.xhr_with_cred = false;
    this.xhr_username = '';
    this.xhr_password = '';
    this.xhr_async = true;               // Boolean        :: Indique si l'appel est synchrone ou asynchrone


	/** ------------------------------------------------------------------------------------------------------------ **
	/** ---                                                                                                      --- **
	/** ---                           Déclaration des méthodes de l'instance xhrQuery                            --- **
	/** ---                                                                                                      --- **
	/** ------------------------------------------------------------------------------------------------------------ **/

    /**
     * Défini l'appel XHR comme étant asynchrone.
     *
     * @return {xhrQuery}
     */
	this.async = function () {
        this.xhr_async = true;

        return this;
    };

	/**
	 * La fonction de callback est la fonction qui traiter la réponse retournée par le serveur
	 *
	 * @args {Functions} accepte x fonctions en paramètre
	 *
	 * @returns {xhrQuery}
	 */
    this.callbacks = function(){
        /** Parcourir les arguments **/
        for(var i = 0; i < arguments.length; i++){
            /** Tester l'arguments = - Si l'argument est une fonctions, alors on l'admet **/
            if(typeof(arguments[i]) === 'function'){
                this.xhr_callbacks.push(arguments[i]);
            } else {
                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::callback() :: The input callback '"+arguments[i]+"' is not a function."});
            }
        }
        
        return this;
    };

    /**
     * Définie les fonctions à appeler en cas d'échec
     *
     * @args {Functions} accepte x fonctions en paramètre
     *
     * @returns {xhrQuery}
     */
    this.errors = function(){
        /** Parcourir les arguments **/
        for(var i = 0; i < arguments.length; i++){
            /** Tester l'arguments = - Si l'argument est une fonctions, alors on l'admet **/
            if(typeof(arguments[i]) === 'function'){
                this.xhr_errorbacks.push(arguments[i]);
            } else {
                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::callback() :: The input callback '"+arguments[i]+"' is not a function."});
            }
        }

        return this;
    };

    /**
     * Define the username for basic authentication.
     *
     * @param {String} sUsername Username.
     */
    this.username = function (sUsername) {
        this.xhr_username = sUsername;
    };

    /**
     * Define the password for basic authentication.
     *
     * @param {String} sPassword Password.
     */
    this.password = function (sPassword) {
        this.xhr_password = sPassword;
    };

	/**
	 * La méthode permet d'envoyer toute les données du/des formulaire(s) donnée.
	 *
	 * @param {HTMLFormElement} form   Accepte autant de formulaire que désirée
	 *
	 * @returns {xhrQuery}   Renvoie la classe pour une utilisation successive
	 */
    this.forms = function(form){
        /** Au moins un argument est attendu **/
        if(form === undefined){
            this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::forms() :: At least one HTMLFormElement is required."});
        }
        
        /** Parcourir les arguments **/
        for(var arg in arguments){
            if(arguments[arg] instanceof HTMLFormElement){
                /** Parcourir les éléments qui compose le formulaire (nativement) **/
                for(var el = 0; el < arguments[arg].elements.length; el++){
                    var element = arguments[arg].elements[el];
                    this.inputs(element);
                }
            } else {
                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::forms() :: Argument n°"+arg+" supplied is invalid : ["+typeof(arguments[arg])+"] "+arguments[arg]+"."});
            }
        }
        
        return this;
    };

	/**
	 * Return the last XMLHttpRequest responses (by index).
	 *
	 * @param {Number} index  Index of the responses starting from 0.
	 *
	 * @returns {*}
	 */
	this.get = function(index) {
        // Si l'arguement n'est pas fournis, la réponse est la dernière exécution.
        if (index === undefined) index = this.xhr_executed;
        // Tenter de paser la réponse.
        index = parseInt(index);
        // Si ça à échoué, utiliser la dernière exécution.
        if (isNaN(index)) index = this.xhr_executed;

        return this.xhr_response[index];
    };

	/**
	 * La fonction parcour l'ensemble des arguments à la recherche d'un couple nom de variable / valeur.
	 * La fonction est autonôme. Elle determine toutes les infos elle-même.
	 *
	 * @args {String|HTMLElement} Accepte des id sous forme de chaine ou des elements HTML input
	 *
	 * @returns {xhrQuery} renvois la classe pour une utilisation successive
	 */
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
                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::inputs() :: The input number "+i+" doesn't not exist -> input ignored."});
            }
            else {
                var input_name = input.getAttribute('name');
                
                /** Uniquement si l'input à un attribut name **/
                if(input_name !== null){
                    /** Selon la nature de l'élement **/
                    switch(input.tagName.toUpperCase()){
                        case "INPUT":
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
                                        this.xhr_form_data.append(input_name, input.value);
                                        this.xhr_raw_data.push(input_name+'='+input.value);
                                    break;
                                        
                                    /** Input de type : radio **/
                                    case 'radio':
                                        if(input.checked){
                                            this.xhr_form_data.append(input_name, input.value);
                                            this.xhr_raw_data.push(input_name+'='+input.value);
                                        }
                                    break;
                                        
                                    /** Input de type : checkbox **/
                                    case 'checkbox':
                                        if(input.checked){
                                            this.xhr_form_data.append(input_name, input.value);
                                            this.xhr_raw_data.push(input_name+'='+input.value);
                                        }
                                    break;
                                        
                                    default:
                                        this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::inputs() :: The input number "+i+" with type = "+input_type+" not managed with xhrQuery() -> input ignored."});
                                    break;
                                }
                            }
                            else {
                                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::inputs() :: The input number "+i+" has no attribut type -> input ignored"});
                            }
                        break;
                        
                        case "SELECT":
                            if(input.options.length > 0){
                                this.xhr_form_data.append(input_name, input.value);
                                this.xhr_raw_data.push(input_name+'='+input.value);
                            } 
                            else {
                                this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::inputs() :: The select input "+input+" has no options -> input ignored"});
                            }
                        break;
                            
                        case "TEXTAREA":
                            this.xhr_form_data.append(input_name, input.value);
                            this.xhr_warn_textarea = true;
                        break;
                        
                        default:
                        break;
                    }
                }
                else {
                    this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::inputs() :: The input number "+i+" don't have attribut name -> input ignored"});
                }
            }
        }
        
        return this;
    };

	/**
	 * Set HTTP Request Headers
	 *
	 * @param {String|Object} mHeader  Header Name / Object with headers name with their values.
	 * @param {String} sValue          Header value when mHeader is a string.
	 */
    this.headers = function (mHeader, sValue) {
        // Simple form - Header Name = Value
        if (typeof mHeader === "string") {
            if (sValue === null) {
                this.xhr_errors.push({
                    "error_level":2,
                    "error_message":"xhrQuery::headers() :: argument 'sValue' should not be null."}
                );
            }
            this.xhr_headers[mHeader] = sValue;
        }

        // Object form
        else if (typeof mHeader === 'object') {
            for (var header in mHeader) {
                if (mHeader[header] === null) {
                    this.xhr_errors.push({
                        "error_level":2,
                        "error_message": `xhrQuery::headers() :: provided header '${header}' shoud not be null`}
                    );
                }
                this.xhr_headers[header] = mHeader[header];
            }
        }
        else {
            console.error("xhrQuery::headers() :: Can not determine type of provided argument 'mHeader'");
        }
    };

	/**
	 * Set flag withCredentials to true (by default) to allow using
	 * cookie and other authentication data for requests made in CORS way.
	 *
	 * @param {Boolean} bState Default to true, set false to disable it.
	 *
	 * @returns {xhrQuery}
	 *
	 * @constructor
	 */
    this.CORSUseCredentials = function (bState = true) {
        this.xhr_with_cred = (bState);

        return this;
    };

	/**
	 *  La fonction définie le mode d'émission des données pour la méthode send().
	 *
	 * @param {String} method   Accepte 'get' ou 'post'
	 *
	 * @returns {xhrQuery} renvois la classe pour une utilisation successive
	 */
	this.method = function(method){
        /** Déclaration des méthode autorisée **/
        var methods = ['get', 'post'];

        /** Neutralisation de la casse **/
        method = method.toLowerCase();

        /** Controle de la méthode **/
        if(methods.lastIndexOf(method) > -1){
            this.xhr_method = method;
        } else {
            this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::methode() :: The method '"+method+"' is not allowed : use 'get' or 'post'"});
        }

        /** auto-renvois **/
        return this;
    };

	/**
	 * La méthode définie la fonction de traitement de l'avancement d'un upload de fichier.
	 *
	 * @param {Function} progress   Fonction de traitement pour la barre de progression.
	 *
	 * @returns {xhrQuery} Renvoie la classe pour une utilisation successive
	 */
    this.progress = function(progress){
        /** Controller que le paramètre donné est bien une fonction **/
        if(typeof(progress) === 'function'){
            this.xhr_progress = progress;
        } else {
            this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::progress() :: The input progress '"+progress+"' is not a function."});
        }

        
        /** auto-renvois **/
        return this;
    };

	/**
	 *  La méthode déclenche l'envois de la requête auprès de la cible à l'aide des données saisie.
	 *  La methodes send() doit être toujours invoquer en dernier, sinon les donnée suivante ne seront pas traité
	 *
	 * @returns {xhrQuery} Renvoie la classe pour une utilisation successive
	 */
    this.send = function(){
        var query_sent = true;
        
        /** Pour émettre la requête il faut disposer au minimum de la cible du script . Si c'est le cas, executer **/
        if(this.xhr_target !== null){
            /** Création de l'instance XMLHttpRequest **/
            this.xhr_engine = new this.xhr();

            // Define Authentication Basic mode when credentials are provided
            // And if user not set himself Authorization header
            if (this.xhr_username || this.xhr_password) {
                if (!this.xhr_headers.Authorization) {
                    var credString = `${this.xhr_username}:${this.xhr_password}`;
                    this.xhr_headers.Authorization = `Basic ${btoa(credString)}`;
                }
            }
            
            /** Déclaration de la fonction de gestion des changements d'état de la requête si définie **/
            if(this.xhr_callback !== null){
                this.xhr_engine.onreadystatechange = function(){
                    /** Lorsque la requête est terminée, alors executer la fonction de callback spécifiée **/
                    if (this.xhr_engine.readyState === 4 && (this.xhr_engine.status === 200 || this.xhr_engine.status === 0)){
                        for(var i = 0; i < this.xhr_callbacks.length; i++){
                            this.xhr_callbacks[i](this.xhr_engine.responseText);
                        }
                        //this.xhr_callback[0](this.xhr_engine.responseText);
                    } else if(this.xhr_engine.readyState === 4) {
                        // @TODO implement responseHandling
                        for (var i = 0; i < this.xhr_errorbacks.length; i++) {
                            this.xhr_errorbacks[i](this.xhr_engine.response);
                        }
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
                    var url = this.xhr_target;
                    
                    for(var i = 0; i < this.xhr_raw_data.length; i++){
                        url_vars = (url_vars !== null) ? url_vars+'&'+this.xhr_raw_data[i] : this.xhr_raw_data[i];
                    }

                    if (url_vars) {
                        url = this.xhr_target+'?'+url_vars;
                    }
                    
                    /** Emettre l'alerte si des données de type input file on été saisies **/
                    if(this.xhr_send_file){
                        this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::send() :: Datas sent with 'GET' method. The files datas has not been sent."});
                    }
                    
                    /** Emettre l'alerte si des donnée de type textarea on été utilisée **/
                    if(this.xhr_warn_textarea){
                        this.xhr_errors.push({"error_level":2,"error_message":"xhrQuery::send() :: Datas sent with 'GET' method. The textarea inputs has not been sent."});
                    }
                    
                    /** Envoyer les données **/
                    this.xhr_executed++;
                    this.xhr_engine.open("GET", url, this.xhr_async);
                    for (var header in this.xhr_headers) {
                        if (!this.xhr_headers.hasOwnProperty(header)) continue;
                        this.xhr_engine.setRequestHeader(header, this.xhr_headers[header]);
                    }
                    this.xhr_engine.withCredentials = this.xhr_with_cred;
                    this.xhr_engine.send(null);
                break;

                case 'post':
                    this.xhr_executed++;
                    this.xhr_engine.open("POST", this.xhr_target, this.xhr_async);
                    for (var header in this.xhr_headers) {
                        if (!this.xhr_headers.hasOwnProperty(header)) continue;
                        this.xhr_engine.setRequestHeader(header, this.xhr_headers[header]);
                    }
                    this.xhr_engine.withCredentials = this.xhr_with_cred;
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

        return this;
    };

    /**
     * Défini l'appel XHR comme étant synchrone
     *
     * @return {xhrQuery}
     */
    this.sync = function () {
        this.xhr_async = false;

        return this;
    };

	/**
	 * La méthode définie la cible de la requête qui devra traiter les donnée envoyé à l'aide de send().
	 * Selon la cible, il se peut qu'il soit nécessaire d'indiquer le chemin complet vers le script.
	 *
	 * @param {String} target    Chemin vers le script.
	 *
	 * @returns {xhrQuery} Renvoie la classe pour une utilisation successive.
	 */
	this.target = function(target){
        /** Assignation de la cible **/
        this.xhr_target = target;
        
        return this;
    };

	/**
	 *  La méthode permet d'envoyer directement des données sous la forme : nom_de_variable=valeur.
	 *
	 * @args {String}   Accepte autant de couple "name=value".
	 *
	 * @returns {xhrQuery}  Renvoie la classe pour une utilisation successive
	 */
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

	/**
	 * Create the appropriate XMLHttpRequest object for current browser.
	 *
	 * @returns {ActiveXObject|XMLHttpRequest}
	 */
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



	/** ------------------------------------------------------------------------------------------------------------ **
	/** ---                                                                                                      --- **
	/** ---                           Traitement interne de la classe xhrQuery                                   --- **
	/** ---                                                                                                      --- **
	/** ------------------------------------------------------------------------------------------------------------ **/
    // Ajouter une callbacks "interne" pour stocker la réponse
    this.callbacks(function(response) {
        this.xhr_response.push(response);
    }.bind(this));
    
    
    /** auto-renvois **/
    return this;
}