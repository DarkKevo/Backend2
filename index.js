//BDD

var DataBase = {
	Casas: [
		{
			id: 1,
			nombre: 'Casa Sindical',
			tipo: 'Casa',
			muros: 7,
			pisos: 2,
			ventanas: 3,
			puertas: 5,
		},
		{
			id: 2,
			nombre: 'Quinta San Jose',
			tipo: 'Casa',
			muros: 12,
			pisos: 3,
			ventanas: 10,
			puertas: 7,
		},
	],
	Edificios: [
		{
			id: 3,
			nombre: 'El trebol',
			tipo: 'Edificio',
			muros: 50,
			pisos: 45,
			ventanas: 90,
			puertas: 100,
		},
		{
			id: 4,
			nombre: 'Paradise Garden',
			tipo: 'Edificio',
			muros: 40,
			pisos: 40,
			ventanas: 55,
			puertas: 40,
		},
	],
	Centro_Comercial: [
		{
			id: 5,
			nombre: 'El edivica',
			tipo: 'Centro',
			muros: 24,
			pisos: 2,
			ventanas: 5,
			puertas: 30,
		},
		{
			id: 6,
			nombre: 'CC Coraluz',
			tipo: 'Centro',
			muros: 10,
			pisos: 4,
			ventanas: 12,
			puertas: 22,
		},
	],
};

//Requerimientos con Express

const express = require('express');
const servidor = express();
const morgan = require('morgan');

//Configuraciones de Express

servidor.set('port', 3000);

//Middlewares

servidor.use(express.json());
servidor.use(morgan('dev'));

//Routes

//Devolucion de Informacion
servidor.get('/info', (req, res) => {
	var Info = {
		Casas: DataBase.Casas.length,
		Edificios: DataBase.Edificios.length,
		Centros_Comerciales: DataBase.Centro_Comercial.length,
		Estructuras_Totales:
			DataBase.Casas.length +
			DataBase.Edificios.length +
			DataBase.Centro_Comercial.length,
	};
	res.json(Info);
	res.status(200)
});

//Devolucion de la Base de Datos Completa
servidor.get('/TotalArray', (req, res) => {
	res.json(DataBase);
	res.status(200)
});

//Devolucion de la Base Correspondiente a las Casas
servidor.get('/CasasArray', (req, res) => {
	res.json(DataBase.Casas);
	res.status(200)
});

//Devolucion de la Base Correspondiente a los Edificios
servidor.get('/EdificiosArray', (req, res) => {
	res.json(DataBase.Edificios);
	res.status(200)
});

//Devolucion de la Base Correspondiente a los Centros Comerciales
servidor.get('/CentrosArray', (req, res) => {
	res.json(DataBase.Centro_Comercial);
	res.status(200)
});

//Insercion de Datos en el Arreglo de Casas
servidor.post('/CasasInsert', (req, res) => {
	DataBase.Casas.push(req.body);
	console.log('Se agrego el dato');
	console.log(req.body);
	res.status(200).json({msg: "Dato Insertado"})
});

//Insercion de Datos en el Arreglo de Edificios
servidor.post('/EdificiosInsert', (req, res) => {
	DataBase.Edificios.push(req.body);
	console.log('Se agrego el dato');
	console.log(req.body);
	res.status(200).json({msg: "Dato Insertado"})
});

//Insercion de Datos en el Arreglo de Centro Comercial
servidor.post('/CentroInsert', (req, res) => {
	DataBase.Centro_Comercial.push(req.body);
	console.log('Se agrego el dato');
	console.log(req.body);
	res.status(200).json({msg: "Dato Insertado"})
});

//Edicion de Datos de Casas

servidor.put('/Casas/edition/:ID_de_Edicion', (req, res) => {
	var found = false;
	DataBase.Casas.forEach((i) => {
		if (i.id == req.params.ID_de_Edicion) {
			found = true;
			DataBase.Casas[DataBase.Casas.indexOf(i)] = req.body;
			res.status(200).json({msg: "Dato Encontrado y Actualizado"})
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado"})
	}
});

//Edicion de Datos de Edificios

servidor.put('/Edificios/edition/:ID_de_Edicion', (req, res) => {
	var found = false;
	DataBase.Edificios.forEach((i) => {
		if (i.id == req.params.ID_de_Edicion) {
			found = true;
			DataBase.Edificios[DataBase.Edificios.indexOf(i)] = req.body;
			res.status(200).json({msg: "Dato Encontrado y Actualizado"})
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado"})
	}
});

//Edicion de Datos de Centros Comerciales

servidor.put('/Centro/edition/:ID_de_Edicion', (req, res) => {
	var found = false;
	DataBase.Centro_Comercial.forEach((i) => {
		if (i.id == req.params.ID_de_Edicion) {
			found = true;
			DataBase.Centro_Comercial[DataBase.Centro_Comercial.indexOf(i)] = req.body;
			res.status(200).json({msg: "Dato Encontrado y Actualizado"})
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado"})
	}
});

//Eliminacion de Datos de Casas

servidor.delete('/Casas/delete/:ID_de_Eliminacion', (req, res) => {
	var found = false;
	DataBase.Casas.forEach((i) => {
		if (i.id == req.params.ID_de_Eliminacion) {
			found = true;
			DataBase.Casas.splice(DataBase.Casas.indexOf(i), 1);
			res.status(200).json({msg: "Dato Encontrado y Eliminado con Exito"})
			console.log('Dato eliminado...');
			console.log(i);
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado Eliminacion Fallida"})
	}
});

//Eliminacion de Datos de Edificios

servidor.delete('/Edificios/delete/:ID_de_Eliminacion', (req, res) => {
	var found = false;
	DataBase.Edificios.forEach((i) => {
		if (i.id == req.params.ID_de_Eliminacion) {
			found = true;
			DataBase.Edificios.splice(DataBase.Edificios.indexOf(i), 1);
			res.status(200).json({msg: "Dato Encontrado y Eliminado con Exito"})
			console.log('Dato eliminado...');
			console.log(i);
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado Eliminacion Fallida"})
	}
});

//Eliminacion de Datos de Centros Comerciales

servidor.delete('/Centro/delete/:ID_de_Eliminacion', (req, res) => {
	var found = false;
	DataBase.Centro_Comercial.forEach((i) => {
		if (i.id == req.params.ID_de_Eliminacion) {
			found = true;
			DataBase.Centro_Comercial.splice(DataBase.Centro_Comercial.indexOf(i), 1);
			res.status(200).json({msg: "Dato Encontrado y Eliminado con Exito"})
			console.log('Dato eliminado...');
			console.log(i);
		}
	});
	if (found == false) {
		res.status(404).json({msg: "Dato no Encontrado Eliminacion Fallida"})
	}
});

//Listen

servidor.listen(servidor.get('port'), () => {
	console.log(`Server Started on port ${servidor.get('port')}`);
});
