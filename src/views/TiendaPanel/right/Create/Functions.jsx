import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postproducts, NewCategory } from "../../../../redux/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Functions(Validate, shopId, shop) {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { id, name, image, description } = shop;
	const [err, setErr] = useState({});
	const [listcategories, setlistcategories] = useState({
		add: [],
	});
	const categories = useSelector((state) => state.allcategories);
	const [input, setInput] = useState({
		name: "",
		description: "",
		price: 0,
		discount: 0,
		stock: 0,
		categories: "",
		image: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;

		setInput({
			...input,
			[name]: value,
		});
		setErr(Validate(input, listcategories));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(Validate(input, listcategories));

		let produc = {
			shopId: shopId[0],
			name: input.name,
			description: input.description,
			price: Number(input.price),
			discount: Number(input.discount),
			stock: Number(input.stock),
			image: !input.image
				? "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png"
				: input.image,
			categories: listcategories.add,
		};

		if (
			Object.keys(err).length === 0 &&
			listcategories.add.length &&
			input.name &&
			input.price &&
			input.discount &&
			input.stock
		) {
			dispatch(postproducts(produc));
			navigate(`/home`)
			Swal.fire({
				icon: "success",
				title: "Éxito",
				text: `Se a creado el producto ${input.name} exitosamente.`,
			});

			setInput({
				name: "",
				description: "",
				price: 0,
				discount: 0,
				stock: 0,
				categories: "",
				image: "",
			});

			setlistcategories({ add: [] });
		}
	};

	const add = (e) => {
		e.preventDefault();

		if (!input.categories.trim()) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "El campo no puede estar vacío.",
			});
		} else if (listcategories.add.some((c) => c === input.categories)) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "No se puede agregar la misma categoría.",
			});
		} else if (!Object.keys(err).includes("listcategories")) {
			if (!categories.find((f) => f === input.categories)) {
				const newc = { name: input.categories };
				dispatch(NewCategory(newc));
			}

			if (input.categories !== "") {
				listcategories.add.push(input.categories);
			}
		}

		setInput({
			...input,
			categories: "",
		});
	};

	const eliminar = (name) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción no se puede revertir.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "¡Sí, quiero!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					"¡Categoría Borrada!",
					"La categoría fue removida de la lista.",
					"success"
				);
				let categories = listcategories.add.filter((c) => c !== name);

				setlistcategories({
					...categories,
					add: categories,
				});
			}
		});
	};

	const handleUploadImg = (element) => {
		const file = element.target.files[0];
		const reader = new FileReader();
		reader.onloadend = function () {
			setInput({ ...input, image: reader.result });
		};
		reader.readAsDataURL(file); //transforma la imagen a b64 (string), y asi lo puede leer
	};

	return {
		handleChange,
		input,
		handleSubmit,
		err,
		listcategories,
		add,
		eliminar,
		handleUploadImg,
	};
}
