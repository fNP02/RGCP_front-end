import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOps } from "../store/Ops"; // Asegúrate de que este hook exista y funcione correctamente
import { UserHeader } from "./UserHeader";
import { SearchComponent } from "./SearchComponent";
import Modal from 'react-modal';

export const UserPage = () => {

    const [ops, setOps] = useState([]);
    const navigate = useNavigate();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const { getAllOps, allOps } = useOps();
    const [resultsFound, setResultsFound] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    useEffect(() => {
        // Reemplaza getOps con la función que uses para obtener las ops
        const fetchOps = async () => {
            const opsData = await getAllOps();
            setOps(opsData);
        };

        fetchOps();
    }, []);


    return (
        <div>
            <UserHeader />
            <div className="ops-table">
                {allOps.map((op) => (
                    <div className="op" key={op.id}>
                        <h4 className="institution">{op.institution_name}</h4>
                        <h7 className="categorias">{op.categorias.join(", ")}</h7>

                        <img
                            className="image"
                            src={op.imageUrl}
                            alt="Imagen no disponible"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(op.imageUrl);
                            }}
                        />
                        <p className="descripcion">{op.descripcion}</p>
                    </div>
                ))}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Imagen seleccionada"
                    style={{
                        overlay: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        content: {
                            width: '50%',
                            position: 'relative',
                            margin: 'auto',
                        },
                    }}
                >
                    <img className="modal-image" src={selectedImage} alt="Imagen seleccionada" />
                </Modal>
            </div>
        </div>
    );
};