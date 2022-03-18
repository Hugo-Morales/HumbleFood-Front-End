export default function Validate(input, listcategories) {
	let err = {};
	let regex = /[\W]/y;
	let notnumber = /[\d]/g;

	if (!input.name.trim()) {
		err.name = "Este campo es obligatorio";
	} else if (notnumber.test(input.name)) {
		err.name = "No se permiten números.";
	} else if (regex.test(input.name)) {
		err.name = "No se permiten caractéres especiales.";
	}

	if (!input.price) {
		err.price = "Ingrese un valor";
	} else if (Number(input.price) < 0 || Number(input.price) === 0) {
		err.price = "Tiene que ser mayor a 0.";
	}

	if (!input.discount) {
		err.discount = "Ingrese un valor";
	} else if (Number(input.discount) < 5 || Number(input.discount) === 0) {
		err.discount = "Tiene que ser mayor a 5%.";
	} else if (Number(input.discount) >= 100) {
		err.discount = "El descuento no puede superar el 100.";
	}

	if (!input.stock) {
		err.stock = "Ingrese un valor";
	} else if (Number(input.stock) < 0 || Number(input.stock) === 0) {
		err.stock = "Tiene que se mayor a 0";
	}

	if (!input.description.trim()) {
		err.description = "Tienes que agregar una descripción del producto.";
	} else if (regex.test(input.description)) {
		err.description = "No se permiten caractéres especiales.";
	} else if (notnumber.test(input.description)) {
		err.description = "No se permiten números.";
	} else if (input.description.length < 5) {
		err.description = "Tienes que más de 5 caractéres.";
	}

	if (regex.test(input.categories)) {
		err.listcategories = "No se permiten caractéres especiales.";
	} else if (notnumber.test(input.categories)) {
		err.listcategories = "No se permiten números.";
	} else if (!listcategories.add.length && !input.categories) {
		err.listcategories = "Debes al menos ingresar una categoría al producto.";
	} else if (notnumber.test(listcategories.add)) {
		err.listcategories = "No se permiten números.";
	}

	return err;
}
