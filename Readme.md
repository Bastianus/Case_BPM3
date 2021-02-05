Dit zijn de stappen die je moet doorlopen om de cursussen app te laten werken:

Er wordt aangenomen dat het volgende al is geinstalleerd:
- Chrome webbrowser
- Visual Studio 2019 enterprise edition (met ASP.Net en C++ desktop development onderdelen)
- Visual Studio Code
- node.js
- angular

Om de backend te starten:
-   In de folder backend staat een backend solution. Open deze met Visual Studio, en wacht tot hij klaar is met laden.
-   open een package manager console (via het menu: tools -> NuGet package manager -> package manager console)
    In dit console, run het volgende commando om roslyn te updaten: 
    Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r  
-   Bovenin staat IIS Express, met aan de rechterkant een drop down menu. Kies voor Chrome (compatabiliteit 
    met andere browsers is   niet getest).
-   Druk op de knop IIS Express of druk op f5.
    De frontend pagina is nu actief en geopend, en is te vinden in chrome met het adres: http://localhost:49744/ .
    Klik de automatisch geopende pagina niet dicht, dan stopt de backend.

om de frontend te starten:
-   in een terminal, run het commando: npm install. Dit installeert alle benodigde afhankelijkheden
-   in een terminal, als de vorige stap klaar is, run het commando: ng serve
    De eerste keer duurt dit wat langer dan volgende keren.
    De frontend runt nu, en is te bereiken via chrome op het adres: http://localhost:4200