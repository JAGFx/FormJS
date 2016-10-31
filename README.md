## Guide d'utilisation Form  
Dans tous les cas, la page de traitement appelé sera celle de **`action`**. Il peut être **`NULL`**

##### HTML
Mettre l'attribut **`data-preventDefault`** à **`yes`**.
Une requête va être effectué vers **`action`** avec les données du formulaire. La réponse sera récupérée par l'Ajax  
```html
<form method="..." action="maPage.php" data-preventDefault="yes">
	<div class="messageForm"></div>
  	...
</form>
```  



##### Javascript / JQuery
Le fichier forms.js comprend le script pour récupérer et interpreter le résultat du traitement d'**`action`**.  
**`alert.type`**, **`alert.titre`** et **`alert.msg`** sont définis grâce aux données **`data`** récupérées.  
*Note: La structure de retour est définie dans [PHP](#php)*  
```javascript
...
success:     function ( retour ) {
    if ( retour == '' ) {
        writeAlert( $this, alert, btnSubmit );
        return;
    }
    
    var dataRetour = $.parseJSON( retour );
    var notif      = "";
    
    // Le Type doit strictement être parmi "success", "info", "warning" ou "danger"
    if ( dataRetour.Type === "success"
        || dataRetour.Type === "warning"
        || dataRetour.Type === "danger"
        || dataRetour.Type === "info" ) {
    
        // Redirection si Type = "success" et si une Url est spécifié
        if ( dataRetour.Type === "success"
            && dataRetour.Url != null ) {
    
            notif = " - Redirection automatique dans une seconde";
            setTimeout( function () {
                window.location.replace( dataRetour.Url );
            }, 1100 );
        }
    
        // Affichage de l'alert
        alert.type  = dataRetour.Type;
        alert.titre = dataRetour.Data.Titre;
        alert.msg   = dataRetour.Data.Message + notif;
        writeAlert( $this, alert, btnSubmit, callback );
        return;
    
    } else {
        writeAlert( $this, alert, btnSubmit );
        return;
    }
}
...
```
**`dataRetour`** : Données renvoyées par le traitement d'**`action`**  
**`dataRetour.Type`** : Type de message à afficher: **`success`**, **`warning`** ou **`danger`**  
**`dataRetour.Data.Titre`** : Titre du message à afficher.    
**`dataRetour.Data.Message`** : Message de retour à afficher.  



##### PHP  
La structure de retour de l'envoi par Ajax du traitement est la suivante:  
```php
	$retour = array(
		"Type" => "success",
		"Data" => array(
			"Titre" => "UnTitre",
			"Message" => "Un petit message"
		),
		"Url" => "unePetiteUrl.php"
	);
```
A noter:
* Le **`"Type"`** de **`$retour`** doit être **strictement** égale aux types décris dans [Javascript / JQuery](#javascript--jquery).  
* L'**`"Url"`** si elle n'est pas spécifié doit avoir la valeur **`null`** dans le cas d'un **`success`**.  
* Le nom des clés dans **`$retour`** sont sensibles à la case.  

Pour terminer le traitement et envoyer le tous, il suffit d'encoder **`$retour`** grâce à la fonction en PHP **`json_encode()`** et de l'afficher.  
```php
	echo json_encode($retour);
```

##### Exemple
Cas 1 - Succès sans redirection  
* **`$retour["Type"] = "success"`**  
* **`$retour["Data"]["Titre"] = "Succès"`**  
* **`$retour["Data"]["Message"] = "Tout c'est bien passé !"`**  
* **`$retour["Url"] = null`**  
![Exemple de message - Success sans redirection](http://www.jagfx.fr/Uploads/sucess_-_form_arters.PNG)  

Cas 2 - Succès avec redirection  
* **`$retour["Type"] = "success"`**  
* **`$retour["Data"]["Titre"] = "unTitre"`**  
* **`$retour["Data"]["Message"] = "Un petit message"`**  
* **`$retour["Url"] = "unePetiteUrl.php"`**  
![Exemple de message - Success avec redirection](http://www.jagfx.fr/Uploads/sucess_URL-_form_arters.PNG)


Cas 3 - Autres cas (Danger ou Warning)  
* **`$retour["Type"] = "danger"`**  
* **`$retour["Data"]["Titre"] = "Erreur Traitement"`**  
* **`$retour["Data"]["Message"] = "Impossible d'envoyer les données. Verifiez le champs d'action"`**  
![Exemple de message - Autre cas](http://www.jagfx.fr/Uploads/error_-_form_arters.PNG)  