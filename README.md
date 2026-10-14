vad kan jag laga?
Om sidan
¨vad kan jag laga?¨är en receptsida där besökaren bockar i de ingredienserna hon eller han har hemma, sidan visar direkt vilka recept som går att laga, hur många ingredienser som finns och vad som saknas. Det är till ett projekt som jag har tänkt på ofta när jag står i köket och inte vet vad jag vill laga för nåt, av det som redan finns i skafferiet istället för att behöva handla.

Sidan är byggd med HTML, CSS, och JS som ett projekt i Frontend kursen.

Skiss

Skissen är gjord med FIGMA och finns i repot: sketch-laptop.png. och sketch-mobile.png

Skillnader i skiss: skissen gjordes tidigt i projektet och sen dess har jag använt båda min fantasi och AI för att göra hemsidan lite snyggare, i skissen är footern en enkel ruta men en footer med tre kolumner på den färdiga sidan, då, som sagt, ville att sidan ska se mer färdigt ut.

*Funktionalitet*


-Besökaren kan: bocka i och av ingredienser som finns högst upp på listan-
-Direkt kan se hur många av receptets ingredienser som finns (har 3 av 5) och vilka som saknas-
-se att recepten sorteras så att de som matchar bäst hamnar överst-
-se en markering på recept där alla ingredienser finns-

Interaktiviteten ligger i script.js

Funktion	
getUniqueIngredients() = Plockar ut varje ingrediens en gång ur receptdatan
renderIngredients()	= Skapar en checkbox per ingrediens och lägger dem på sidan
getSelectedIngredients()	= Returnerar en lista med de ingredienser som är ibockade
getMatchInfo()	= Delar upp ett recepts ingredienser i de jag har och de som saknas
getSortedRecipes()	= Sorterar recepten efter hur många ingredienser som finns
createRecipeCard()	= Bygger ett receptkort med bild, räknare och saknade ingredienser
renderRecipes()	= Tömmer receptlistan och ritar upp korten på nytt
setupEvents()	= Kopplar händelselyssnaren med addEventListener

Layouten ligger i style.css och använder flexbox. En media query ändrar layouten för mobil.

*AI användning*

Jag har använt Claude som hjälp under arbetet.

Exempel 1: Receptdata

Vad bad jag om? Fyra till fem recept som JS-objekt att börja med. 
Vad fick jag? En array med fem recept där varje recept har, name, description, och en lista ingredients. 
Många ingredienser återkommer i flera recept, till exempel ägg och mjölk. 
Vad gjorde jag med det? jag la in arraken i script.js och testade med console.log(recipes.length) jag lade 
senare till image och alt i varje recept och skrev på mina bilder det som fanns på ett ungefärligt sätt.

Exempel 2: Att filtrera och sortera recepten
Vad bad jag om? Hjälp med att få sidan att visa vilka ingredienser som saknas för varje recept, och att sortera recepten efter. hur många ingredienser jag har.
Vad jag fick? Funktionerna getMatchInfo() med två .filter()-anrop och en sortering med .sort().
Vad gjorde jag med det? Jag testade funktionerna i konsolen och lät mig AI fråga mig hur det fungerar, min första förklaring var fel, jag trodde att .sort() delade upp ingredienserna i ¨har¨och ¨saknas. Det är .filter() som väljer ut ingredienser som klarar ett villkor, medan .sort() bara ändrar ordningen på recepten. 
Det andra .filter() för att vända på villkoret för att få istället fram det som saknas.

Exempel 3: CSS och media query
Vad jag bad om? en demo style.css med flexbox för chips och receptkort, samt responsiv styling för mobil. 
Vad jag fick? stilmall där chips och kort ligger i flex-container med flex-wrap: wrap, och en media query för skärmar under 600px.

Vad gjorde jag med det? jag läste igenom koden och testade media queryn genom att göra webbläsarfönstret smalare. sidan behöver media queryn eftersom korten skulle annars vara för smala på telefon, så på små skärmar tar varje kort hela bredden istället. Jag ändrade dessutom färgerna och bad om en annan layout för att få sidan att se som jag ville.

Tekniska val

- Receptdata i en array av objekt.
  Alla recept ligger som data i script.js, då jag kan lägga till nya recept utan att ändra på HTML:en eftersom sidan byggs utifrån datan.

- Checkboxarna skapas utifrån datan.
  getUniqueIngredients() ser till att varje ingrediens bara får en checkbox, även även om det finns i flera recept, jag slipper skriva checkboxar för hand då.
  En enda addEventListener på #ingredient-list. Alla checkboxar ligger inuti #ingredient-list. När en checkbox ändras bubblar change-händelsen upp, till den container, så att det räcker med en lyssnare bara, då slipper jag att behöva lägga lyssnare på varje checkbox, och jag behöver inte skriva om kod igen.
  
*Receptlistan töms och ritas om varje gång.*
renderRecipes() tömmer #recipe-list med innerHTML = ¨¨ innan den bygger nya kort, så att korten inte dubbleras. 

* Sorteringen görs på en kopia. Jag sorterar (...recipes) så att den ursprungliga ordningen i inte ändras.
* En funktion per uppgift. Att läsa val, räkna träffar, sortera, bygga kort och koppla händelser är separata funktioner. Det gör koden lättare att läsa och testa, och ingen kod behöver upprepas.
* Semantisk HTML. Sidan använder header, nav, main, section, article, footer, men det finns även h1, receptkorten har h3 under h2 och alla bilder har alt-texter.
* Alla filer och id skrivs med små bokstäver och bindesträck.
*Flexbox och media query. Flexbox placerar element I header, chips, kort och footer, media query gör att korten och fostren staplas på mobil.

Bedöming av AI-innehåll

* Jag litade inte heller bara på kod för den kom från AI, utan jag bedömde den så här:
* Jag körde koden och testade den i webbläsaren i konsolen. (console.log, kontroll av felmeddelanden) istället för att bara anta att det fungerade. 
* Jag lät mig frågas ut på hur funktionerna fungerar och rättade mina egna missförstånd, till exempel skillnaden mellan .filter() och .sort()
* jag kontrollerade sidan mot kravlistan i uppgiften och validerade HTML:en på validator.w3.org.

  Det jag behöll, strukturen med receptdata som objekt, uppdelningen i små funktioner och att en lyssnare på #ingredient-list styr uppdateringen.

  Det jag ändrade:

  alt-texter, färger,  texter i footern, gjorde lite små ändringar på layouten.

  Det jag inte bara tog rakt av: bilderna valde jag själv från Unsplash och pexels, istället för att använda förslag.
