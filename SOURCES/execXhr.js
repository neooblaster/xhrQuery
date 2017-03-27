/********************************************************************************************************
/*	[ SCRIPT ]
/*		- execXhr.js
/*
/*	[ FICHIER(S) REQUIS ]
/*		- newXhr.js
/*
/*	[ FICHIER(S) CONCERNE(S) ]
/*		- undefined
/*
/*	[ RELEASE ]
/*		- 30/03/2014
/*		- 01/08/2014 - Correction de i=3 par i=4 dans la boucle for - lecture paramètres facultatifs
/*
/*	[ FONCTIONS ]
/*		execXhr()
/*
/*	[ DETAIL FONCTIONS ]
/*		# execXhr(method, data, callback, dest)
/*			• Requis pour fonctionner
/*				- Aucune spécificité
/*			
/*			• Paramètres d'entrée :
/* 				- method	[string]		:	Methode d'envoie de donnée formulaire à PHP {POST || GET}
/*				- data		[string]		:	Format de donnée reçu en retour {TEXT || XML}
/*				- callback	[function]		:	Fonction appellé à l'issue de la requête. Saisir uniquement le nom de fonction (ne gère qu'un seul paramètre)
/*				- dest		[string]		:	Fichier cible de la requête. Le path à pour racine de document HTML ou PHP hôte - Si on est dans index.php => Fonctions/cible.php et non pas ../Fonctions/cible.php
/*				- arguments	[string]	:	Autant de couple paramètre "NAME=VALUE" que l'ont veut envoyé à cible.php
/*			
/*			• Paramètres de sortie :
/*				- aucun
/*
/*			• Description : 
/*				- Envois des données de facon asynchrone au serveur php à la cible.php définie par "dest"
/*				- Lorsque la requete est terminée avec succès, la fonction "callback" est executé avec comme paramètre xhr.responseText ou xhr.responseXML selon le param "data"
/*
/*			• Détail Fonctionnelle :
/*				1. Création de l'objet xhr à l'aide de la fonction newXhr(cf file .js du même nom)
/*				2. Convertion de la variable string method et string data afin d'avoir toujours la bonne valeur à testé
/*				3. Définition d'une fonction sur la propriété onreadystatechange de l'objet xhr pour executé une action lorsque celle-ci c'est déroulé correctement (readyState == 4 et status == 200 ou 0) [équivalent ) cela : .onload]
/*				4. Analyser des paramètres facultatif afin de compiler tout les couples NAME=VALUE en un seul envois (les couple doivent etre séparé par &)
/*				5. Ouverture de la connexion et envois de la requete selon la method spécifié
/*
/*			• Niveau d'utilisation :
/*				- Globale			
/*
/********************************************************************************************************/
function execXhr(method, data, callback, dest){
	//var xhr = newXhr();
	//var method = method.toUpperCase();
	//var data = data.toLowerCase()
	
	//xhr.onreadystatechange = function(){
		//if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			//switch(data){
				//case 'text':				
					//callback(xhr.responseText);
				//break;
				
				//case 'xml':
				//	callback(xhr.responseXML);
				//break;
			//}
		//};
	//}	
	
	/** ANALYSE DES PARAMETRES FACULTATIF SACHANT QUE LES 3 PREMIERS SONT OBLIGATOIRE **/
	//var result = '';
	//for(var i = 4; i < execXhr.arguments.length; i++){
		/** CONSTRUCTION DE RESULT POUR XHR.SEND **/ 
		/** Peut êtrer remplacer par l'objet FormData() et myForm.append(name, value) **/
		//result += (result == '') ? execXhr.arguments[i] : '&'+execXhr.arguments[i];
	//}
	/** SECURISATION DES DONNEES **/
	// result = encodeURIComponent(result);
	/** OUVERTURE DE LA CONNEXION ET ENVOIE DE DONNEE **/
	//switch(method){
	//	case 'GET':
	//		xhr.open("GET", dest+'?'+result, true);
	//		xhr.send(null);
	//	break;
	//	case 'POST':
	//		xhr.open("POST", dest, true);
	//		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//		xhr.send(result);
	//	break;
	//}
}	