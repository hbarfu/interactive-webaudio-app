<!DOCTYPE html>
	<!--
		Web Design: Hannes Barfuss 2020
  ___ ___                                      __________                _____                    
 /   |   \_____    ____   ____   ____   ______ \______   \_____ ________/ ____\_ __  ______ ______
/    ~    \__  \  /    \ /    \_/ __ \ /  ___/  |    |  _/\__  \\_  __ \   __\  |  \/  ___//  ___/
\    Y    // __ \|   |  \   |  \  ___/ \___ \   |    |   \ / __ \|  | \/|  | |  |  /\___ \ \___ \ 
 \___|_  /(____  /___|  /___|  /\___  >____  >  |______  /(____  /__|   |__| |____//____  >____  >
       \/      \/     \/     \/     \/     \/          \/      \/                       \/     \/ 
	-->
<html lang="de">
<head>
	<meta charset="UTF-8">
	<meta name="theme-color" content="#222628" />
	<meta property="og:title" content="Freddys Reise"/>
	<meta property="og:description" content="Eine interaktive Chatstory"/>
	<meta property="og:image" content="https://freddysreise.ch/media/og/freddy_og.jpg"/>
	<meta property="og:video" content="https://freddysreise.ch/video/def/0101_fairies.m4v"/>
	<link rel="stylesheet" type="text/css" href="css/root.css?v=1.2">
		<style>
			<?php
	require_once "Mobile_Detect.php";
	$detect = new Mobile_Detect;
	$mobile = false;
	// Any mobile device (phones or tablets).
	if ( $detect->isMobile() ) {
		$mobile = true;
	 	include 'css/mobile1.1.css';
	}

	else {
		include 'css/desktop1.1.css';
	}
?>
		</style>

		<link href="https://fonts.googleapis.com/css?family=Baloo+Thambi+2&display=swap" rel="stylesheet">
		<link rel=“stylesheet” href=“https://use.typekit.net/tct1oof.css”>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>-->

	<title>Freddys Reise</title>
</head>
<body>
	<script type="text/javascript">
		let is_mobile = "<?php echo json_encode($mobile) ?>";
	</script>
	<div id="sea">
		<div class="islandsize" id="island"></div>
		<div class="islandsize" id="fog"></div>
		<div class="islandsize" id="camContainer">
			<img id="freddy-mapicon" src="img/fp.png"/>
			<img class="camera-icons" id="cam1" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam2" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam3" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam4" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam5" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam7" src="img/Kamera.png"/>
			<img class="camera-icons" id="cam8" src="img/Kamera.png"/>
		</div>
		</img>
	</div>

		<div id="loadcircle"></div>
	<img id="volume-icon" src="img/volumeicon.png">
	<div id="volume-control">
		<img src="img/volume_bar.png" id="volume-bar"/>
		<img src="img/volume_dot.png" id="volume-dot"/>
	</div>

	<div id="social">
		<a href="https://www.instagram.com/freddysreise/"><img class="social-img" src="img/icon_insta.png"></a>
		<a href="https://www.facebook.com/freddysreise"><img class="social-img" src="img/icon_fb.png"></a>
		<a href="https://www.freddysreise.ch/media/Ausmalbilder_Freddy.pdf"><img class="social-img" src="img/ausmal.png"></a>
	</div>

	<div id="impressum-button">
		<img src="img/impressum.png"/>
	</div>

	<div id="chatwindow" class="shadow">
		<div id="chat-mainbar">
			
			<audio id="audio-chat-notification">
		  <source src="audio/sfx/chat-notification.mp3" type="audio/mpeg">
		Your browser does not support the audio element.
		</audio>
		<div id="chatheader" class="ui-header">
			<div class="pad">
				<img id="chat-freddyprofile" src="img/profile_freddy.png"/> <img id="chat-freddyfont" src="img/freddyfont_l.png"/> <span id="chatresize" class="right fit-both"><img id="collapse-horizontal" src="img/arrow_up.png"/></span>
				<div id="chat-newmsg"></div>
			</div>
		</div>
		<div id="chatmessagespace">

			<!--<div class="chatmessage message-other message-other-light"><p class="message-typing">...</p></div>
			<div class="message-typing-annotation">Freddy schreibt etwas...</div>-->
		</div>
		<div id="chatfooter">
			<div class="centered-wrapper">
				<div class="centered-content" id="chatfooter-content">
					<!--<button id="button1">OK cool</button>
					<button id="button2">Glaub ich dir nicht</button>-->
				</div>
			</div>
		</div>
		</div>
		

		<div id="chatsidebar"><img id="collapse-vertical" src="img/arrow_up.png"></div>


	</div>

	<div id="video-window">
		<div id="video-inner-container"></div>
	</div>

	<div id="impressum">
		<div id="impressum-inner">
			
			<h2>Impressum</h2>
			 <div class="separee"></div>
<p><b>Kontaktdaten Privat</b></p>
<p>Noemi Carlen</p>
<p>E-Mail: <script type="text/javascript"><!--/* Generated by www.email-encoder.com */
for(var vazatf=["ZQ","YQ","Lw","bg","Yw","YQ","Lg","bw","ZQ","Yw","ZQ","bQ","PA","cg","bQ","bg","ZQ","Pg","aA","bQ","bw","PQ","bg","QA","aQ","Lg","Yw","bQ","QA","dA","bA","Lg","Ig","Zw","bA","bQ","Yw","cg","IA","cg","YQ","ZQ","Zg","YQ","Ig","aQ","YQ","Zw","aQ","bw","Og","PA","bA","aQ","aQ","YQ","bw","bw","Pg","bQ","bg","Lg","YQ","bQ","bA","bA"],xwelml=[50,23,63,27,46,10,34,17,18,35,26,9,62,48,61,51,5,65,3,30,41,7,16,52,20,21,22,37,28,13,25,58,38,53,33,54,59,24,2,4,1,42,6,64,8,56,31,29,32,60,15,0,49,11,44,47,36,14,39,19,40,45,55,43,12,57],xsfauq=new Array,i=0;i<xwelml.length;i++)xsfauq[xwelml[i]]=vazatf[i];for(var i=0;i<xsfauq.length;i++)document.write(atob(xsfauq[i]+"=="));
// --></script><noscript>Please enable JavaScript to see the email address (<a href="https://www.email-encoder.com/enablejs/" target="_blank" rel="noopener noreferrer">How-to</a>).</noscript></p>
 <div class="separee"></div>
<p><b>Kontaktdaten Hochschule</b></p>
<p>Fachrichtung Cast / Audiovisual Media</p>
<p>Departement Design</p>
<p>Herr Nico Lypitkas</p>
<p>E-Mail: <script type="text/javascript"><!--/* Generated by www.email-encoder.com */
for(var ikzvns=["aw","aA","aA","Ig","YQ","PQ","dA","YQ","YQ","ZA","aA","Pg","cw","PA","Zg","bA","aQ","bw","Yw","Pg","Lg","aA","bg","eg","bQ","Og","aw","Yw","YQ","eg","IA","Zg","cg","bg","aQ","Ig","Zg","Yw","aA","PA","Lg","Lg","cw","dA","bw","Lw","aQ","ZA","dA","ZQ","QA","bw","Yw","YQ","Lg","QA"],skqwfk=[29,3,51,8,54,7,13,1,36,28,46,55,18,52,23,12,21,14,31,34,39,32,22,45,9,15,48,16,17,26,2,6,4,41,40,33,42,35,27,0,30,49,37,19,24,53,11,47,38,5,25,43,50,10,20,44],xbgnyp=new Array,i=0;i<skqwfk.length;i++)xbgnyp[skqwfk[i]]=ikzvns[i];for(var i=0;i<xbgnyp.length;i++)document.write(atob(xbgnyp[i]+"=="));
// --></script><noscript>Please enable JavaScript to see the email address (<a href="https://www.email-encoder.com/enablejs/" target="_blank" rel="noopener noreferrer">How-to</a>).</noscript></p>
  <div class="separee"></div>

<p>Zürcher Hochschule der Künste</p>
<p>Pfingstweidstrasse 96</p>
<p>Postfach</p>
<p>CH-8031 Zürich</p>
  <div class="separee"></div>

<h2>Beteiligte</h2>
<p>Ein Projekt von Noemi Carlen</p>
<p><b>Musik:</b> Céline Fankhauser</p>
<p><b>Web Development, Sound Design:</b> Hannes Barfuss <a href="https://www.zhdk.ch/studium/musik/kompositiontheorie/ma-komposition-und-theorie-1203/sounddesign">(MA Sound Design)</a></p>
<p><b>Mentorat:</b> William Crook</p>
<p><b>Leitung Bachelor Cast / Audiovisual Media:</b> Nico Lypitkas</p>
 
  <div class="separee"></div>

<h2>Datenschutzerklärung</h2>
<p><b>Grundlegendes</b></p>
<p>Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Websitebetreiber Zürcher Hochschule der Künste, Pfingstweidstrasse 96, 8031 Zürich, Schweiz informieren.</p>

<p>Der Websitebetreiber nimmt Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften.</p>

<p>Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”) finden Sie in Art. 4 DSGVO.</p>
<p><b>Zugriffsdaten</b></p>
<p>Wir, der Websitebetreiber bzw. Seitenprovider, erheben aufgrund unseres berechtigten Interesses (s. Art. 6 Abs. 1 lit. f. DSGVO) Daten über Zugriffe auf die Website und speichern diese als „Server-Logfiles“ auf dem Server der Website ab. Folgende Daten werden so protokolliert:</p>
<p>• Besuchte Website</p>
<p>• Uhrzeit zum Zeitpunkt des Zugriffes</p>
<p>• Menge der gesendeten Daten in Byte</p>
<p>• Quelle/Verweis, von welchem Sie auf die Seite gelangten</p>
<p>• Verwendeter Browser</p>
<p>• Verwendetes Betriebssystem</p>
<p>• Verwendete IP-Adresse</p>
 
<p><b>Umgang mit Kontaktdaten</b></p>
<p>Nehmen Sie mit uns als Websitebetreiber durch die angebotenen Kontaktmöglichkeiten Verbindung auf, werden Ihre Angaben gespeichert, damit auf diese zur Bearbeitung und Beantwortung Ihrer Anfrage zurückgegriffen werden kann. Ohne Ihre Einwilligung werden diese Daten nicht an Dritte weitergegeben.</p>
 
<p><b>Google Analytics</b></p>
<p>Diese Website nutzt aufgrund unserer berechtigten Interessen zur Optimierung und Analyse unseres Online-Angebots im Sinne des Art. 6 Abs. 1 lit. f. DSGVO den Dienst „Google Analytics“, welcher von der Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA) angeboten wird. Der Dienst (Google Analytics) verwendet „Cookies“ – Textdateien, welche auf Ihrem Endgerät gespeichert werden. Die durch die Cookies gesammelten Informationen werden im Regelfall an einen Google-Server in den USA gesandt und dort gespeichert.</p>

<p>Google LLC hält das europäische Datenschutzrecht ein und ist unter dem Privacy-Shield-Abkommen zertifiziert:
<a href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active">https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active</a></p>

<p>Auf dieser Website greift die IP-Anonymisierung. Die IP-Adresse der Nutzer wird innerhalb der Mitgliedsstaaten der EU und des Europäischen Wirtschaftsraum und in den anderen Vertragsstaaten des Abkommens gekürzt. Nur in Einzelfällen wird die IP-Adresse zunächst ungekürzt in die USA an einen Server von Google übertragen und dort gekürzt. Durch diese Kürzung entfällt der Personenbezug Ihrer IP-Adresse. Die vom Browser übermittelte IP-Adresse des Nutzers wird nicht mit anderen von Google gespeicherten Daten kombiniert.</p>

<p>Im Rahmen der Vereinbarung zur Auftragsdatenvereinbarung, welche wir als Websitebetreiber mit der Google Inc. geschlossen haben, erstellt diese mithilfe der gesammelten Informationen eine Auswertung der Websitenutzung und der Websiteaktivität und erbringt mit der Internetnutzung verbundene Dienstleistungen.</p>

<p>Die von Google in unserem Auftrag erhobenen Daten werden genutzt, um die Nutzung unseres Online-Angebots durch die einzelnen Nutzer auswerten zu können, z. B. um Reports über die Aktivität auf der Website zu erstellen, um unser Online-Angebot zu verbessern.</p>

<p>Sie haben die Möglichkeit, die Speicherung der Cookies auf Ihrem Gerät zu verhindern, indem Sie in Ihrem Browser entsprechende Einstellungen vornehmen. Es ist nicht gewährleistet, dass Sie auf alle Funktionen dieser Website ohne Einschränkungen zugreifen können, wenn Ihr Browser keine Cookies zulässt.</p>

<p>Weiterhin können Sie durch ein Browser-Plugin verhindern, dass die durch Cookies gesammelten Informationen (inklusive Ihrer IP-Adresse) an die Google Inc. gesendet und von der Google Inc. genutzt werden. Folgender Link führt Sie zu dem entsprechenden Plugin: 
<a href="https://tools.google.com/dlpage/gaoptout?hl=de">https://tools.google.com/dlpage/gaoptout?hl=de</a> </p>

<p>Alternativ können Sie diese Seite mit einem Klick auf <a href="https://www.zhdk.ch/">diesen Link</a> verlassen.</p>

<p>Hier finden Sie weitere Informationen zur Datennutzung durch die Google Inc.:</p>
<p>• Daten, die von Google-Partnern erhoben werden <a href="https://policies.google.com/technologies/partner-sites?hl=de">(https://policies.google.com/technologies/partner-sites?hl=de)</a></p>
<p>• Einstellungen über Werbung, die Ihnen angezeigt wird <a href="https://adssettings.google.de/authenticated?pli=1">(https://adssettings.google.de/authenticated?pli=1)</a></p>
<p>• Verwendung von Cookies in Anzeigen <a href="https://policies.google.com/technologies/ads?hl=de">(https://policies.google.com/technologies/ads?hl=de)</a></p>
 
<p><b>Speichern des Spielstands</b></p>
<p>Um den Spielstand zu speichern, werden technische Cookies verwendet. Diese enthalten keinerlei personenbezogene Daten. Sie werden weder an unseren Server übertragen noch mit Dritten geteilt.</p>

<p><b>Verlinkte Webseiten</b></p>
<p>Manche Links auf der Webseite führen zu Webseiten von Dritten. Die Nutzung dieser verlinkten Webseiten erfolgt in eigener Verantwortung und unter Beachtung deren Datenschutzerklärung. Für die Richtigkeit, Vollständigkeit und Rechtmässigkeit der dort enthaltenen Inhalte und Angebote übernimmt die ZHdK keinerlei Verantwortung.</p>
 
<p><b>Rechte des Nutzers</b></p>
<p>Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur Aufbewahrung von Daten (z. B. Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf Löschung Ihrer Daten. Von uns gespeicherte Daten werden, sollten sie für ihre Zweckbestimmung nicht mehr vonnöten sein und es keine gesetzlichen Aufbewahrungsfristen geben, gelöscht. Falls eine Löschung nicht durchgeführt werden kann, da die Daten für zulässige gesetzliche Zwecke erforderlich sind, erfolgt eine Einschränkung der Datenverarbeitung. In diesem Fall werden die Daten gesperrt und nicht für andere Zwecke verarbeitet.</p>
 
<p><b>Widerspruchsrecht</b></p>
<p>Nutzer dieser Webseite können von ihrem Widerspruchsrecht Gebrauch machen und der Verarbeitung ihrer personenbezogenen Daten zu jeder Zeit widersprechen. 
Wenn Sie eine Berichtigung, Sperrung, Löschung oder Auskunft über die zu Ihrer Person gespeicherten personenbezogenen Daten wünschen oder Fragen bzgl. der Erhebung, Verarbeitung oder Verwendung Ihrer personenbezogenen Daten haben oder erteilte Einwilligungen widerrufen möchten, wenden Sie sich bitte an folgende E-Mail-Adresse: <script type="text/javascript"><!--/* Generated by www.email-encoder.com */
for(var ikzvns=["aw","aA","aA","Ig","YQ","PQ","dA","YQ","YQ","ZA","aA","Pg","cw","PA","Zg","bA","aQ","bw","Yw","Pg","Lg","aA","bg","eg","bQ","Og","aw","Yw","YQ","eg","IA","Zg","cg","bg","aQ","Ig","Zg","Yw","aA","PA","Lg","Lg","cw","dA","bw","Lw","aQ","ZA","dA","ZQ","QA","bw","Yw","YQ","Lg","QA"],skqwfk=[29,3,51,8,54,7,13,1,36,28,46,55,18,52,23,12,21,14,31,34,39,32,22,45,9,15,48,16,17,26,2,6,4,41,40,33,42,35,27,0,30,49,37,19,24,53,11,47,38,5,25,43,50,10,20,44],xbgnyp=new Array,i=0;i<skqwfk.length;i++)xbgnyp[skqwfk[i]]=ikzvns[i];for(var i=0;i<xbgnyp.length;i++)document.write(atob(xbgnyp[i]+"=="));
// --></script><noscript>Please enable JavaScript to see the email address (<a href="https://www.email-encoder.com/enablejs/" target="_blank" rel="noopener noreferrer">How-to</a>).</noscript></p>
 <div class="separee"></div>

<p>Diplomarbeit Bachelor</p>
<p>Fachrichtung Cast / Audiovisual Media</p>
<p>Departement Design</p>
<p>Zürcher Hochschule der Künste</p>

		</div>
	</div>

	<div id="close-video-window">
			<img src="img/close.png">
		</div>

	<div id="prompt-container">
		<!--<div id="prompt" class="shadow pad"><p>just a test prompt</p>
			<button>Button 1</button>
		</div>-->
	</div>



	<!-- just some mockup functionality for testing -->
	<script type="text/javascript">
		button1 = document.getElementById("button1");
		button2 = document.getElementById("button2");
		msgspace = document.getElementById("chatmessagespace");
		chatheader = document.getElementById("chatheader");
		chatfooter = document.getElementById("chatfooter");
		chatresize = document.getElementById("chatresize");
		chatwindow = document.getElementById("chatwindow");
		freddy_mapicon = document.getElementById("freddy-mapicon");
		camera = document.getElementById("camera-icons");
		video_window = document.getElementById("video-window");
		video_inner_container = document.getElementById("video-inner-container");
		close_video_window = document.getElementById("close-video-window");
		video = undefined;

		/*button1.onclick = function() {
			sendMsg(button1.innerHTML);
		}
		button2.onclick = function() {
			sendMsg(button2.innerHTML);
		}*/

		const OPEN = 1;
		const CLOSED = 0;
		chatopened = OPEN;



	</script>
	<script language="javascript" type="text/javascript" src="js/chat.js?v=1.2"></script>
	<script language="javascript" type="text/javascript" src="js/audio.js?v=1.2"></script>
	<script language="javascript" type="text/javascript" src="js/audiorequest_smpl.js?v=1.2"></script>
		<script language="javascript" type="text/javascript" src="js/event-handlers.js?v=1.2"></script>
		<script language="javascript" type="text/javascript" src="js/videoplayer.js?v=1.2"></script>
				<script language="javascript" type="text/javascript" src="js/savegame.js?v=1.2"></script>
	<script language="javascript" type="text/javascript" src="js/test.js?v=1.2"></script>
</body>
</html>