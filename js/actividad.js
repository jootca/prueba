 var operandoString = ""; //variable del resultado
 var operandoMemoria = ""; //almacena memoria
 var signo = false;
 var ceroDeReseteo = true; //sabemos cuando es el 1º caso
 var decimal = false;
 var contador = 0; //ayuda a controlar el . decimal
 var memoriaPantalla = false;


 function mostrar(a) {


 	var b = document.getElementById("pantalla").getAttribute("value");
 	//inicio(primer dato)
 	if (b == 0 && ceroDeReseteo) {

 		//casos 1 dato signos
 		if (a == "*" || a == "/" || a == "+" || a == "-" || a == ".") {
 			if (a == ".") {

 				signo = true;
 				contador++;
 				decimal = true;
 				ceroDeReseteo = false;
 				a = 0 + a;
 				document.getElementById("pantalla").setAttribute("value", a);

 				return;

 			}
 			return;
 		}
 		//caso numeros
 		ceroDeReseteo = false;
 		signo = false;
 		document.getElementById("pantalla").setAttribute("value", a);
 		return;
 	}
 	//datos posteriores
 	if (a == "*" || a == "/" || a == "+" || a == "-" || a == ".") {


 		if (!signo && !decimal) {
 			if (a == "." && contador >= 1) {
 				return;
 			} else if (a == ".") {
 				//si se pone punto y hay un resultado lo impide
 				if (operandoString != "") {
 					return;
 				}
 				if (memoriaPantalla) {
 					return;
 				}
 				operandoString = "";
 				contador++
 				b += a;
 				decimal = true;
 				document.getElementById("pantalla").setAttribute("value", b);
 				return;
 			}
 			//casos operadores(+,-,*./) unico caso en que se resetea la variable resultado
 			if (operandoString != "") {
 				operandoString = "";
 			}
 			if (memoriaPantalla) {
 				memoriaPantalla = false;
 			}
 			b += a;
 			signo = true;
 			decimal = false;
 			console.log("numero");
 			contador = 0;
 			document.getElementById("pantalla").setAttribute("value", b);
 			return;
 		}
 		if (!signo && decimal) {
 			if (a == "." && contador >= 1) {
 				return;
 			} else {
 				//si pulso un signo impedir que se grabe si es distinto de un numero, accediento al ultimo valor de pantalla
 				if (pantalla.value.slice(-1) != ".") {
 					console.log(pantalla.value.slice(-1));
 					signo = true;
 					decimal = false;
 					contador = 0;
 					b += a;
 					document.getElementById("pantalla").setAttribute("value", b);
 					return;
 				}

 				return;
 			}


 		}
 		if (signo && decimal) {
 			if (a == "." && contador == 0) {
 				contador++
 				b += a;
 				decimal = true;
 				document.getElementById("pantalla").setAttribute("value", b);

 			}


 			return;
 		}
 		if (signo && !decimal) {
 			if (a == "." && !(a == "*" || a == "/" || a == "+" || a == "-")) {
 				return;
 			}
 			if (a == ".") {
 				contador++
 				b += a;
 				decimal = true;
 				document.getElementById("pantalla").setAttribute("value", b);

 			}


 			return;
 		}



 	}
 	//casos en los que entran numeros si hay resultado no deja introducir numero hasta que entra signo
 	if (operandoString != "") {

 		return;
 	}
 	if (memoriaPantalla) {
 		return;
 	}
 	console.log("aqui<br>");
 	signo = false;
 	b += a;
 	document.getElementById("pantalla").setAttribute("value", b);
 }

 function resetear() {
 	document.getElementById("pantalla").setAttribute("value", "0");
 	signo = false;
 	ceroDeReseteo = true;
 	decimal = false;
 	contador = 0;

 }

 function borrarMemoria() {
 	operandoMemoria = "";
 	memoriaPantalla = false;

 }

 function memoria() {
 	var b = document.getElementById("pantalla").getAttribute("value");


 	if (operandoMemoria == "") {
 		//preparo valor seguro
 		b = eval(b);
 		//si esta vacio obtengo valor en variable de memoria
 		operandoMemoria = b;
 		memoriaPantalla = true;
 		signo = false;

 		resetear();
 	} else {
 		//1º caso se supone que no puede entrar signo
 		if (ceroDeReseteo) {
 			document.getElementById("pantalla").setAttribute("value", operandoMemoria);

 		} else {
 			console.log(operandoMemoria);
 			if (b.slice(-1) == "*" || b.slice(-1) == "/" || b.slice(-1) == "+" || b.slice(-1) == "-") {
 				console.log("entro");
 				b = b + operandoMemoria;
 				document.getElementById("pantalla").setAttribute("value", b);
 				//es lo mismo que meter un numero ya  te permite introducir otro signo en la siguiente accion
 				signo = false;
 				memoriaPantalla = true;
 			} else {
 				return;
 			}



 		}

 	}


 }

 function resultado() {
 	operandoString = document.getElementById("pantalla").getAttribute("value");
 	document.getElementById("pantalla").setAttribute("value", eval(operandoString));
 	signo = false;
 	decimal = false;
 	contador = 0;

 }

 function invertir() {
 	var b = document.getElementById("pantalla").getAttribute("value");
 	if (b.charAt(0) == "-") {

 		var elimina = b.replace(/\*/g, "");
 		var elimina = elimina.replace(/\//g, "");
 		var elimina = elimina.replace(/\+/g, "");
 		var elimina = elimina.replace(/-/g, "");
 		document.getElementById("pantalla").setAttribute("value", elimina);
 	} else {

 		var elimina = b.replace(/\*/g, "");
 		var elimina = elimina.replace(/\//g, "");
 		var elimina = elimina.replace(/\+/g, "");
 		var elimina = elimina.replace(/-/g, "");
 		document.getElementById("pantalla").setAttribute("value", eval(-elimina));
 	}


 }