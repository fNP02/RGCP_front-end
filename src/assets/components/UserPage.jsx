import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOps } from "../store/Ops";
import { UserHeader } from "./UserHeader";
import { SearchComponent } from "./SearchComponent";
import { colors } from '../store/Constants';
import Modal from 'react-modal';

export const UserPage = () => {
    const [ops, setOps] = useState([]);
    const navigate = useNavigate();
    const { getAllOps, allOps } = useOps();
    const [resultsFound, setResultsFound] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const fetchOps = async () => {
            const opsData = await getAllOps();
            setOps(opsData);
        };

        fetchOps();
    }, []);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleClick = () => {
        setZoom(prevZoom => prevZoom === 1 ? 2 : 1);
    };

    return (
        <div className="div-molesto">
            <UserHeader />
            <div className="user-page-div">
                {allOps.map((op) => (
                    <div className="op" key={op.id}>
                        <h2 className="institution">{op.institucionName}</h2>
                        <br />
                        <h5 className="categorias">
                            {op.categorias.map((categoria, index) => (
                                <span
                                    key={index}
                                    className="category"
                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                >
                                    {categoria}
                                </span>
                            ))}
                        </h5>
                        <br />
                        <img
                            className="image"
                            src={op.img}
                            alt="Imagen no disponible"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(op.img);
                            }}
                        />
                        <br />
                        <p className="descripcion">{op.descripcion}</p>
                        <br />
                        <p className="fecha"> {op.fechaDelEvento} </p>
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
                            width: '80%',
                            maxHeight: '90vh',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        },
                    }}
                >
                    <button onClick={closeModal} className="button-close">x</button>
                    <img
                        className="modal-image"
                        src={selectedImage}
                        alt="Imagen seleccionada"
                        style={{ transform: `scale(${zoom})` }}
                        onClick={handleClick}
                    />
                </Modal>
            </div>
        </div>
    );
};