/********************************************************************************************************
/*	[ SCRIPT ]
/*		- newXhr.js
/*
/*	[ FICHIER(S) REQUIS ]
/*		- aucun
/*
/*	[ FICHIER(S) CONCERNE(S) ]
/*		- undefined
/*
/*	[ RELEASE ]
/*		- 04/03/2014
/*
/*	[ FONCTIONS ]
/*		newXhr()
/*
/*	[ DETAIL FONCTIONS ]
/*		# newXhr()
/*			• Requis pour fonctionner
/*				- Aucune spécificité
/*			
/*			• Paramètres d'entrée :
/* 				- aucun
/*			
/*			• Paramètres de sortie :
/*				- xhr	[object]	:	Retourne l'objet XMLHttpRequest obtenu selon navigateur
/*
/*			• Description : 
/*				- Création de l'objet XMLHttpRequest en fonction du navigateur de l'utilisateur
/*
/*			• Détail Fonctionnelle :
/*				1. Test du navigateur
/*					1.1. Si Internet Explorer, (qui est le seul à gerer ActiveXObject) créer l'objet selon la version de celui-ci (Inférieur à IE9)
/*					1.2. Sinon, c'est un autre navigateur qui gère directment XMLHttpRequest
/*
/*			• Niveau d'utilisation :
/*				- Globale			
/*
/********************************************************************************************************/


function newXhr(){
	/** CREATION DE L'OBJET POUR IE **/
	if(window.ActiveXObject){
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
			return(xhr);
		}
		catch(e){
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
			return(xhr);
		}
	} else {
	/** SINON POUR LES AUTRE NAVIGATEUR C'EST STANDART **/
		xhr = new XMLHttpRequest();
		return(xhr);
	}
	return(null);
}