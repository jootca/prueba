 var operandoString = ""; //variable del resultado
 var operandoMemoria = ""; //almacena memoria
 var signo = false;
 var ceroDeReseteo = true; //sabemos cuando es el 1º caso
 var decimal = false;
 var contador = 0; //ayuda a controlar el . decimal
 var memoriaPantalla = false;


 function mostrar(a) {


	 var b = document.getElementById("pantalla").getAttribute("value");
	 console.log(signo);
	 console.log(decimal);
 	//inicio(primer dato)
 	if (b == 0 && ceroDeReseteo) {

 		//casos 1 dato signos
 		if (a == "*" || a == "/" || a == "+" || a == ".") {
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
		 if (a == "-") {
			ceroDeReseteo = false;
			signo = true;
			
			document.getElementById("pantalla").setAttribute("value", a);
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

	 
	 if (memoriaPantalla && b.slice(-1)=="-") {
		signo = false;
		b += a;
		document.getElementById("pantalla").setAttribute("value", b);
	 }
 	if (memoriaPantalla) {
 		return;
 	}
	 console.log("aqui<br>");
	 console.log("aqui" + a);
 	signo = false;
 	b += a;
 	document.getElementById("pantalla").setAttribute("value", b);
 }

 function resetear() {
 	document.getElementById("pantalla").setAttribute("value", "0");
 	signo = false;
 	decimal = false;
 	contador = 0;
 	ceroDeReseteo = true;
 }

 function borrarMemoria() {
 	operandoMemoria = "";
 	memoriaPantalla = false;
 	document.getElementById("mem").setAttribute("value", "");

 }

 function memoria() {
 	var b = document.getElementById("pantalla").getAttribute("value");


 	if (operandoMemoria == "") {

 		if (b.slice(-1) == "*" || b.slice(-1) == "/" || b.slice(-1) == "+" || b.slice(-1) == "-" || b.slice(-1) == ".") {
 			//me quedo con el valor seguro eliminando el signo
 			b = b.slice(0, -1);
 			//preparo valor seguro
 			b = eval(b);
 			//si esta vacio obtengo valor en variable de memoria
 			operandoMemoria = b;
 			//lo envio a pantalla de memoria
 			document.getElementById("mem").setAttribute("value", b);
 			resetear();
 			memoriaPantalla = true;
 		} else {

 			b = eval(b);
 			operandoMemoria = b;
 			document.getElementById("mem").setAttribute("value", b);
 			resetear();
 			memoriaPantalla = true;

 		}



 	} else {
 		//1º caso se supone que no puede entrar signo
 		if (ceroDeReseteo) {
 			document.getElementById("pantalla").setAttribute("value", operandoMemoria);
 			ceroDeReseteo = false;

 		} else {
 			console.log(operandoMemoria);
 			//si tiene signo antes se puede poner numero en valor seguro
 			if (b.slice(-1) == "*" || b.slice(-1) == "/" || b.slice(-1) == "+" || b.slice(-1) == "-") {
 				if (b.slice(-1) == "-" && operandoMemoria < 0) {
 					b = b.slice(0, -1);
 				}
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
 	//va a se un valor seguro eliminando algun signo que pueda hacer fallar el eval
 	if (b.slice(-1) == "*" || b.slice(-1) == "/" || b.slice(-1) == "+" || b.slice(-1) == "-" || b.slice(-1) == ".") {
 		//me quedo con el valor seguro eliminando el signo
 		b = b.slice(0, -1);
 		//lo evalue 
 		b = eval(b);
 		//invierto su valor ya que es un boton de inversion
 		document.getElementById("pantalla").setAttribute("value", -b);
 		//muevo su valor a la variable resultado para impedir la intrusion de un numero o del signo "." hasta que no se meta un operando
 		operandoString = -b;
 		//reseteo variables a inicio salvo ceroDeReseteo ya que tenemos un valor puesto
 		signo = false;
 		decimal = false;
 		contador = 0;
 		ceroDeReseteo = false;
 	} else {
 		//opcion en la que llega valor seguro misma lógica que la anterior
 		b = eval(b);
 		document.getElementById("pantalla").setAttribute("value", -b);
 		operandoString = -b;
 		signo = false;
 		decimal = false;
 		contador = 0;
 		ceroDeReseteo = false;

 	}

 }